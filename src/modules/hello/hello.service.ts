import { requestContext } from "@/core/async_context/context";
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
      requestContext.get().req.header("tenant-id")
    );
  }
  async getCurrentUser() {
    console.log("HelloService HelloService1");
    console.log(this.clsService, "==============111============");
    setTimeout(() => {
      console.log(requestContext.get().req.header("tenant-id"));
    }, 5000);
    return this.clsService.getCurrentUser();
  }
}
