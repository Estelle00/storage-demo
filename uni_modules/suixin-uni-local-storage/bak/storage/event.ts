import type { Fn } from  "../types";
interface NewFn extends Fn {
  fn?: Fn
}
const events: Record<string, NewFn[]> = {};

export function on(event: string, fn: () => void) {
  if (Array.isArray(event)) {
    for (let e of event) {
      on(e, fn);
    }
  } else {
    (events[event] || (events[event] = [])).push(fn);
  }
}
export function off(event: string | string[], fn?: Fn) {
  if (Array.isArray(event)) {
    for (const e of event) {
      off(e, fn);
    }
  } else {
    const cbs = events[event];
    if (!cbs) return;
    if (!fn) {
      delete events[event];
      return;
    }
    let cb = null;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if(cb === fn || cb.fn === fn) {
        events[event].splice(i, 1);
        break;
      }
    }
  }
}
export function once(event: string, fn: Fn) {
  function callback(...arg: unknown[]) {
    off(event, callback);
    fn.apply(null, arg);
  }
  callback.fn = fn;
  on(event, callback);
}

export function emit(event: string, ...args: unknown[]) {
  const cbs = events[event];
  if (cbs) {
    for (const cb of cbs) {
      cb.apply(null, args);
    }
  }
}