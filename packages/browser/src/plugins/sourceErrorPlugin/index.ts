import type { Plugin } from "@eagle-eye-sdk/core";
import MonitorSDK from "@eagle-eye-sdk/core";
import { on } from "../../helpers/index";
export interface sourceErrorTarget {
  currentSrc?: string;
  href?: string;
  localName?: string;
  src?: string;
}
const sourceErrorPlugin: Plugin = {
  setup: function (client: MonitorSDK) {
    // TODO: 判断是否已经初始化,才开始执行
    const globalEventHandlers = function (e: ErrorEvent) {
      const target = e.target as sourceErrorTarget;
      if (e.cancelable) {
        client.collect({
          type: "resourceErrorReport",
          payload: {
            type: target.localName,
          },
        });
      }
    };
    on(window, "error", globalEventHandlers, true);
  },
};

export default sourceErrorPlugin;
