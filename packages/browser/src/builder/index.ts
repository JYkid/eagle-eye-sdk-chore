import type { Builder } from "@eagle-eye-sdk/core";

class BrowserBuilder implements Builder {
  build(): void {
    console.log("Browser...");
  }
}

export default new BrowserBuilder();
