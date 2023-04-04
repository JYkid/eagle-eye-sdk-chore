import MonitorSDK from "@eagle-eye-sdk/core";
import BrowserSender from "./sender/index";
import BrowserBuilder from "./builder/index";
import { jsErrorPlugin, consolePlugin } from "./plugins";
const BrowerClient = new MonitorSDK(BrowserSender, BrowserBuilder);
BrowerClient.use(jsErrorPlugin);
BrowerClient.use(consolePlugin);

export default BrowerClient;
