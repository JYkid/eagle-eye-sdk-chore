import type { Plugin } from "@eagle-eye-sdk/core";
import MonitorSDK from "@eagle-eye-sdk/core";
const consolePlugin: Plugin = {
  setup: function (client: MonitorSDK) {
    // TODO: 判断是否已经初始化,才开始执行
    client.on("collect", (data: unknown) => {
      console.log("collect...", data);
      return data;
    });
  },
};

export default consolePlugin;
