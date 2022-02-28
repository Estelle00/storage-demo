const events = {};

export function on(event, fn) {
  if (Array.isArray(event)) {
    for (let e of event) {
      on(e, fn);
    }
  } else {
    (events[event] || (events[event] = [])).push(fn);
  }
}
export function off(event, fn) {
  if (Array.isArray(event)) {
    for (const e of event) {
      off(e, fn);
    }
  } else {
    const cbs = events[event];
    if (!cbs) return;
    if (!fn) {
      events[event] = null;
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
export function once(event, fn) {
  function callback() {
    off(event, callback);
    fn.apply(null, arguments);
  }
  callback.fn = fn;
  on(event, callback);
}

export function emit(event, ...args) {
  const cbs = events[event];
  if (cbs) {
    for (const cb of cbs) {
      cb.apply(null, args);
    }
  }
}