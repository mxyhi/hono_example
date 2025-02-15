import { AsyncLocalStorage } from "node:async_hooks";

export class AsyncContextStore<T extends object> {
  private readonly asyncLocalStorage = new AsyncLocalStorage<T>();

  get(): T {
    const store = this.asyncLocalStorage.getStore();
    if (!store) {
      throw new Error("请求上下文未初始化");
    }
    return store;
  }

  run<U>(context: T, callback: () => Promise<U> | U): Promise<U> | U {
    return this.asyncLocalStorage.run(context, callback);
  }
}
