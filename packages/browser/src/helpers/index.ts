// TODO: 抽象出去单独的包
export function on(
  target: { addEventListener: Function },
  eventName:
    | keyof GlobalEventHandlersEventMap
    | keyof XMLHttpRequestEventTargetEventMap
    | keyof WindowEventMap,
  handler: Function,
  opitons: boolean | unknown = false
): void {
  target.addEventListener(eventName, handler, opitons);
}
