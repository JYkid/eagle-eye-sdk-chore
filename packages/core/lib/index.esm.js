var EventHandler = /** @class */ (function () {
    function EventHandler(handlers) {
        if (handlers === void 0) { handlers = {}; }
        this.handlers = handlers;
    }
    EventHandler.prototype.addHandler = function (ev, handler) {
        if (!this.handlers[ev]) {
            this.handlers[ev] = [];
        }
        this.handlers[ev].push(handler);
    };
    EventHandler.prototype.removeHandler = function (ev, handler) {
        if (!this.handlers[ev]) {
            return;
        }
        var index = this.handlers[ev].indexOf(handler);
        if (index !== -1) {
            this.handlers[ev].splice(index, 1);
        }
    };
    EventHandler.prototype.handle = function (ev, once) {
        if (once === void 0) { once = false; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var eventHandlers = this.handlers[ev];
        if (!eventHandlers)
            return;
        eventHandlers.forEach(function (handler) {
            try {
                handler.apply(void 0, args);
            }
            catch (error) { }
        });
        if (once) {
            delete this.handlers[ev];
        }
    };
    EventHandler.prototype.getHandler = function (ev) {
        return this.handlers[ev];
    };
    return EventHandler;
}());

// 线性处理数据
function runProcessors(processors) {
    return function (input) {
        return processors.reduce(function (output, processor) {
            try {
                return output && processor(output);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        }, input);
    };
}
// 基座
var MonitorSDK = /** @class */ (function () {
    function MonitorSDK(sender, builder) {
        this.sender = sender;
        this.builder = builder;
        this.handler = new EventHandler();
    }
    // 收集用户信息
    MonitorSDK.prototype.collect = function (data) {
        if (!data)
            return;
        var processed = runProcessors(this.handler.getHandler("collect"))(data);
        if (!processed)
            return;
        this.build(processed);
    };
    // 组装信息
    MonitorSDK.prototype.build = function (data) {
        if (!data)
            return;
        var preBuild = runProcessors(this.handler.getHandler("beforeBuild"))(data);
        var builded = this.builder.build(preBuild);
        if (!builded)
            return;
        var processed = runProcessors(this.handler.getHandler("build"))(data);
        if (processed)
            return;
        this.send(processed);
    };
    // 上报信息
    MonitorSDK.prototype.send = function (data) {
        this.sender.send(data);
    };
    return MonitorSDK;
}());

export { MonitorSDK as default };