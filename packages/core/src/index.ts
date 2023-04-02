import EventHandler from "./EventHandler";

interface Sender {
  send: (data: unknown) => void;
}
interface Builder {
  build: (data: unknown) => unknown;
}
// 线性处理数据
function runProcessors(processors: Function[]) {
  return function (input: unknown) {
    return processors.reduce((output, processor) => {
      try {
        return output && processor(output);
      } catch (error) {
        console.log(error);
        return null;
      }
    }, input);
  };
}
// 基座
class MonitorSDK {
  sender: Sender;
  handler;
  builder: Builder;
  constructor(sender: Sender, builder: Builder) {
    this.sender = sender;
    this.builder = builder;
    this.handler = new EventHandler();
  }
  // 收集用户信息
  public collect(data: unknown) {
    if (!data) return;
    const processed = runProcessors(this.handler.getHandler("collect"))(data);
    if (!processed) return;
    this.build(processed);
  }
  // 组装信息
  build(data: unknown) {
    if (!data) return;
    const preBuild = runProcessors(this.handler.getHandler("beforeBuild"))(
      data
    );
    var builded = this.builder.build(preBuild);
    if (!builded) return;
    const processed = runProcessors(this.handler.getHandler("build"))(data);
    if (processed) return;
    this.send(processed);
  }
  // 上报信息
  send(data: unknown) {
    this.sender.send(data);
  }
}

export default MonitorSDK;
