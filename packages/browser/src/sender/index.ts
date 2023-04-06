import type { ISender, IConfigManager } from "@eagle-eye-sdk/core";

class BrowserSender implements ISender {
  configManager: IConfigManager;
  constructor(configManager: IConfigManager) {
    this.configManager = configManager;
  }
  send(data: unknown): void {
    if ("sendBeacon" in navigator) {
      beacon(this.configManager.getConfig().url, data);
    }
  }
}
export function beacon(url: string, data: unknown): boolean {
  if (
    data instanceof ArrayBuffer ||
    data instanceof Blob ||
    typeof data === "string" ||
    data instanceof FormData ||
    data instanceof URLSearchParams
  ) {
    return navigator.sendBeacon(url, data);
  }
  return false;
}

export default BrowserSender;
