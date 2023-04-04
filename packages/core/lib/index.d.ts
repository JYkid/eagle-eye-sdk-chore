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
declare class MonitorSDK {
    sender: Sender;
    handler: EventHandler;
    builder: Builder;
    constructor(sender: Sender, builder: Builder);
    collect(data: unknown): void;
    build(data: unknown): void;
    send(data: unknown): void;
    on(ev: string, handler: Function): void;
    off(ev: string, handler: Function): void;
    use(plugin: Plugin): void;
}
export default MonitorSDK;
