import type { Sender } from "@eagle-eye-sdk/core";

class BrowserSender implements Sender {
  send(): void {}
}

export default new BrowserSender();
