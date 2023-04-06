import type { Plugin } from "@eagle-eye-sdk/core";
import MonitorSDK from "@eagle-eye-sdk/core";
import { on } from "../../helpers/index";
export interface ResourceErrorTarget {
  currentSrc?: string;
  href?: string;
  localName?: string;
  src?: string;
}
const resourceErrorPlugin: Plugin = {
  setup: function (client: MonitorSDK) {
    // TODO: 判断是否已经初始化,才开始执行
    const globalEventHandlers = function (e: ErrorEvent) {
      const target = e.target as ResourceErrorTarget;
      if (target.localName) {
        const url = target.currentSrc || target.src || target.href;
        const subType = target.localName;
        client.collect({
          type: "resource",
          payload: {
            url,
            subType,
          },
        });
      }
    };
    on(window, "error", globalEventHandlers, true);
  },
};

export default resourceErrorPlugin;
