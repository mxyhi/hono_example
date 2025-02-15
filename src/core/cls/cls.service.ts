// src/core/cls/cls.service.ts
import { AsyncLocalStorage } from "node:async_hooks";

// 类型定义
export interface ClsStore {
  requestId: string;
  tenantId?: string;
  user?: {
    id: string;
    role: string;
  };
  [key: string]: unknown;
}

export class ClsService {
  private readonly storage: AsyncLocalStorage<ClsStore>;
  private static initialized = false;

  constructor() {
    this.storage = this.createStorage();
  }

  // 创建适合不同运行时的存储
  private createStorage() {
    if (typeof AsyncLocalStorage === "undefined") {
      return this.createPolyfillStorage();
    }
    return new AsyncLocalStorage<ClsStore>();
  }

  // Cloudflare Workers等环境的Polyfill
  private createPolyfillStorage(): AsyncLocalStorage<ClsStore> {
    const storageKey = Symbol.for("cls.storage");
    return {
      run: (store: ClsStore, callback: () => void) => {
        const prev = (globalThis as any)[storageKey];
        (globalThis as any)[storageKey] = store;
        try {
          return callback();
        } finally {
          (globalThis as any)[storageKey] = prev;
        }
      },
      getStore: () => (globalThis as any)[storageKey],
    } as unknown as AsyncLocalStorage<ClsStore>;
  }

  // 运行请求作用域
  run(store: ClsStore, callback: () => void | Promise<void>) {
    return this.storage.run(store, callback);
  }

  // 获取当前上下文
  get context(): ClsStore {
    const store = this.storage.getStore();
    if (!store) {
      throw new Error("ClsService context not initialized");
    }
    return store;
  }

  // 设置上下文值
  set<T extends keyof ClsStore = keyof ClsStore>(key: T, value: ClsStore[T]) {
    this.context[key] = value;
  }

  // 获取上下文值
  get<T extends keyof ClsStore = keyof ClsStore>(key: T): ClsStore[T] {
    console.log("ClsService get");
    console.log(this.context);
    return this.context[key];
  }
}
