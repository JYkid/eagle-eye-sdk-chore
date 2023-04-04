import type { Sender } from "@eagle-eye-sdk/core";

class BrowserSender implements Sender {
  send(): void {
    console.log("Browser...");
  }
}

export default new BrowserSender();
