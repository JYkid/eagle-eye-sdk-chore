import MonitorSDK from "@eagle-eye-sdk/core";
import BrowserSender from "./sender/index";
import BrowserBuilder from "./builder/index";
const BrowerClient = new MonitorSDK(BrowserSender, BrowserBuilder);

export default BrowerClient;
