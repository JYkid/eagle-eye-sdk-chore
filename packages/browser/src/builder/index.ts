import type { IBuilder } from "@eagle-eye-sdk/core";

// 实现面包
class BrowserBuilder implements IBuilder {
  build(): void {
    console.log("Browser...");
  }
}

export default new BrowserBuilder();
