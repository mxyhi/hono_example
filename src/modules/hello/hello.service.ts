import { getCtx } from "@/core/async_context";
import { di } from "@/core/di/container";

export class HelloService1 {
  constructor() {}
  async getCurrentUser() {
    return 1;
  }
}

export class HelloService {
  constructor(private readonly clsService = di.get(HelloService1)) {
    console.log(
      "=========================init========================================",
      getCtx().var.tenantId
    );
  }
  async getCurrentUser() {
    console.log("HelloService HelloService1");
    console.log(
      this.clsService,
      "==============111============",
      getCtx().var.tenantId
    );
    setTimeout(() => {
      console.log(getCtx().var.tenantId);
    }, 5000);
    return this.clsService.getCurrentUser();
  }
}
