import { requestContext } from "../async_context/context";

export type Constructable<T> = new (...args: any[]) => T;

export class Container {
  private readonly container = new WeakMap<WeakKey, any>();

  get<T>(key: Constructable<T>): T {
    if (!this.container.has(key)) {
      this.container.set(key, new key());
    }
    return this.container.get(key);
  }

  set<K extends object, T>(key: K, value: T): void {
    this.container.set(key, value);
  }
}

export class Di {
  private readonly defaultKey = "default";
  private readonly container = new Map<string | symbol, Container>();

  getContainer(key: string | symbol): Container {
    if (!this.container.has(key)) {
      this.container.set(key, new Container());
    }
    return this.container.get(key)!;
  }

  get<T>(instance: Constructable<T>): T {
    const c = requestContext.get();
    const key = c.req.header("tenant-id") || this.defaultKey;
    const container = this.getContainer(key);

    if (!container) {
      throw new Error(`Container ${key} is not found`);
    }

    const v = container.get(instance);
    if (!v) {
      throw new Error(`Provider ${instance} is not found`);
    }

    return v;
  }
}

export const di = new Di();
