import MonitorSDK from "@eagle-eye-sdk/core";
import BrowserSender from "./sender/index";
import BrowserBuilder from "./builder/index";
import { resourceErrorPlugin, consolePlugin, ctxPlugin } from "./plugins";
const BrowerClient = new MonitorSDK(BrowserSender, BrowserBuilder);
// TODO: use支持一次性导入多个插件
BrowerClient.use(resourceErrorPlugin);
BrowerClient.use(ctxPlugin);
BrowerClient.use(consolePlugin);

export default BrowerClient;
