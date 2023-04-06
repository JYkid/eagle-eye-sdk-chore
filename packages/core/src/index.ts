import EventHandler from "./EventHandler";

export interface Sender {
  send(data: unknown): unknown;
}
export interface Builder {
  build(data: unknown): unknown;
}

export interface Plugin {
  setup(client: MonitorSDK): void;
}

// 线性处理数据
const noop = () => {};
function runProcessors(processors: Function[]) {
  if (!processors || !processors.length) return noop;
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
  // 添加流程
  on(ev: string, handler: Function) {
    this.handler.addHandler(ev, handler);
  }
  // 删除流程
  off(ev: string, handler: Function) {
    this.handler.removeHandler(ev, handler);
  }
  // 安装插件
  // TODO: 绑定 config
  use(plugin: Plugin) {
    plugin.setup(this);
  }
}

export default MonitorSDK;
