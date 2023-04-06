import type { IPlugin } from "@eagle-eye-sdk/core";
import MonitorSDK from "@eagle-eye-sdk/core";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
const ctxPlugin: IPlugin = {
  setup: function (client: MonitorSDK) {
    client.on("collect", (data: unknown) => {
      if (isObject(data)) {
        // 收集浏览器相关公共上下文
        data.context = {
          userAgent: window.navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          colorDepth: window.screen.colorDepth,
          browserLanguage: window.navigator.language,
          cookiesEnabled: window.navigator.cookieEnabled,
          onlineStatus: window.navigator.onLine,
        };
      }
      return data;
    });
  },
};

export default ctxPlugin;
