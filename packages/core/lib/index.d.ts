import EventHandler from "./EventHandler";
export interface Sender {
    send(data: unknown): unknown;
}
export interface Builder {
    build(data: unknown): unknown;
}
declare class MonitorSDK {
    sender: Sender;
    handler: EventHandler;
    builder: Builder;
    constructor(sender: Sender, builder: Builder);
    collect(data: unknown): void;
    build(data: unknown): void;
    send(data: unknown): void;
}
export default MonitorSDK;
