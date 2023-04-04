declare class EventHandler {
    handlers: Record<string, Function[]>;
    constructor(handlers?: {});
    addHandler(ev: string, handler: Function): void;
    removeHandler(ev: string, handler: Function): void;
    handle(ev: string, once?: boolean, ...args: unknown[]): void;
    getHandler(ev: string): Function[];
}
export default EventHandler;
