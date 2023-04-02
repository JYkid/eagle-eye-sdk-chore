class EventHandler {
  handlers: Record<string, Function[]>;
  constructor(handlers = {}) {
    this.handlers = handlers;
  }

  addHandler(ev: string, handler: Function) {
    if (!this.handlers[ev]) {
      this.handlers[ev] = [];
    }
    this.handlers[ev].push(handler);
  }

  removeHandler(ev: string, handler: Function) {
    if (!this.handlers[ev]) {
      return;
    }
    const index = this.handlers[ev].indexOf(handler);
    if (index !== -1) {
      this.handlers[ev].splice(index, 1);
    }
  }

  handle(ev: string, once = false, ...args: unknown[]) {
    const eventHandlers = this.handlers[ev];
    if (!eventHandlers) return;

    eventHandlers.forEach((handler) => {
      try {
        handler(...args);
      } catch (error) {}
    });

    if (once) {
      delete this.handlers[ev];
    }
  }

  getHandler(ev: string) {
    return this.handlers[ev];
  }
}

export default EventHandler;
