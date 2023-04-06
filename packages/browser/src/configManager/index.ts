import type { IConfigManager, Config } from "@eagle-eye-sdk/core";

class BrowserConfigManager implements IConfigManager {
  config: Config;
  constructor(config: Config) {
    this.config = config;
  }
  getConfig(): Config {
    return this.config;
  }
}

export default BrowserConfigManager;
