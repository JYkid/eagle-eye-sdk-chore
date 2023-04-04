(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EagleEyeBrowser = factory());
})(this, (function () { 'use strict';

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
        // 添加流程
        MonitorSDK.prototype.on = function (ev, handler) {
            this.handler.addHandler(ev, handler);
        };
        // 删除流程
        MonitorSDK.prototype.off = function (ev, handler) {
            this.handler.removeHandler(ev, handler);
        };
        // 安装插件
        // TODO: 绑定 config
        MonitorSDK.prototype.use = function (plugin) {
            plugin.setup(this);
        };
        return MonitorSDK;
    }());

    var BrowserSender = /** @class */ (function () {
        function BrowserSender() {
        }
        BrowserSender.prototype.send = function () {
            console.log("Browser...");
        };
        return BrowserSender;
    }());
    var BrowserSender$1 = new BrowserSender();

    var BrowserBuilder = /** @class */ (function () {
        function BrowserBuilder() {
        }
        BrowserBuilder.prototype.build = function () {
            console.log("Browser...");
        };
        return BrowserBuilder;
    }());
    var BrowserBuilder$1 = new BrowserBuilder();

    var consolePlugin = {
        setup: function (client) {
            // TODO: 判断是否已经初始化,才开始执行
            client.on("collect", function (data) {
                console.log("collect...", data);
            });
        },
    };

    // TODO: 抽象出去单独的包
    function on(target, eventName, handler, opitons) {
        if (opitons === void 0) { opitons = false; }
        target.addEventListener(eventName, handler, opitons);
    }

    var jsErrorPlugin = {
        setup: function (client) {
            // TODO: 判断是否已经初始化,才开始执行
            var globalEventHandlers = function (e) {
                var target = e.target;
                if (e.cancelable) {
                    client.collect({
                        type: "resourceErrorReport",
                        payload: {
                            type: target.localName,
                        },
                    });
                }
            };
            on(window, "error", globalEventHandlers, true);
        },
    };

    var BrowerClient = new MonitorSDK(BrowserSender$1, BrowserBuilder$1);
    BrowerClient.use(jsErrorPlugin);
    BrowerClient.use(consolePlugin);

    return BrowerClient;

}));
