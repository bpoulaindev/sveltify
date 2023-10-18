import { o as set_current_component, r as run_all, p as current_component, c as create_ssr_component, v as validate_component, e as escape, q as onDestroy, t as get_store_value, s as subscribe, d as spread, f as escape_object, k as add_attribute, u as createEventDispatcher, h as escape_attribute_value, j as each } from "../../../chunks/ssr.js";
import { u as userProfileStore, t as tokenStore } from "../../../chunks/stores2.js";
import { a as Loader2, L as Loader } from "../../../chunks/loader.js";
import dayjs from "dayjs";
import { d as derived, w as writable, r as readable, a as readonly } from "../../../chunks/index2.js";
import "dequal";
import * as lodash from "lodash";
import { nanoid } from "nanoid/non-secure";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { createFocusTrap as createFocusTrap$1 } from "focus-trap";
import { I as Icon } from "../../../chunks/Icon.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const External_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ],
    ["polyline", { "points": "15 3 21 3 21 9" }],
    [
      "line",
      {
        "x1": "10",
        "x2": "21",
        "y1": "14",
        "y2": "3"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "external-link" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ExternalLink = External_link;
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "heart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Heart$1 = Heart;
const Pause = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "4",
        "height": "16",
        "x": "6",
        "y": "4"
      }
    ],
    [
      "rect",
      {
        "width": "4",
        "height": "16",
        "x": "14",
        "y": "4"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pause" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pause$1 = Pause;
const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["polygon", { "points": "5 3 19 12 5 21 5 3" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "play" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Play$1 = Play;
const Shuffle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"
      }
    ],
    ["path", { "d": "m18 2 4 4-4 4" }],
    ["path", { "d": "M2 6h1.9c1.5 0 2.9.9 3.6 2.2" }],
    [
      "path",
      {
        "d": "M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"
      }
    ],
    ["path", { "d": "m18 14 4 4-4 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shuffle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Shuffle$1 = Shuffle;
const Skip_back = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polygon", { "points": "19 20 9 12 19 4 19 20" }],
    [
      "line",
      {
        "x1": "5",
        "x2": "5",
        "y1": "19",
        "y2": "5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "skip-back" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SkipBack = Skip_back;
const Skip_forward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polygon", { "points": "5 4 15 12 5 20 5 4" }],
    [
      "line",
      {
        "x1": "19",
        "x2": "19",
        "y1": "5",
        "y2": "19"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "skip-forward" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SkipForward = Skip_forward;
const Volume_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polygon",
      {
        "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
      }
    ],
    ["path", { "d": "M15.54 8.46a5 5 0 0 1 0 7.07" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "volume-1" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Volume1 = Volume_1;
const Volume_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polygon",
      {
        "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
      }
    ],
    ["path", { "d": "M15.54 8.46a5 5 0 0 1 0 7.07" }],
    ["path", { "d": "M19.07 4.93a10 10 0 0 1 0 14.14" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "volume-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Volume2 = Volume_2;
const Volume_x = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polygon",
      {
        "points": "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
      }
    ],
    [
      "line",
      {
        "x1": "22",
        "x2": "16",
        "y1": "9",
        "y2": "15"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "22",
        "y1": "9",
        "y2": "15"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "volume-x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const VolumeX = Volume_x;
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "x" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const X$1 = X;
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color } = $$props;
  let { label = "label" } = $$props;
  let { classes = "" } = $$props;
  const colorClasses = {
    green: "bg-green-50 dark:bg-green-400/10 text-green-700 dark:text-green-400 ring-green-600/10 dark:ring-green-400/20",
    indigo: "bg-indigo-50 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-400 ring-indigo-600/10 dark:ring-indigo-400/20",
    red: "bg-red-50 dark:bg-red-400/10 text-red-700 dark:text-red-400 ring-red-600/10 dark:ring-red-400/20",
    zinc: "bg-slate-50 dark:bg-zinc-400/10 text-zinc-700 dark:text-zinc-400 ring-zinc-600/10 dark:ring-zinc-400/20",
    yellow: "bg-yellow-50 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 ring-yellow-600/10 dark:ring-yellow-400/20",
    pink: "bg-pink-50 dark:bg-pink-400/10 text-pink-700 dark:text-pink-400 ring-pink-600/10 dark:ring-pink-400/20",
    purple: "bg-purple-50 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 ring-purple-600/10 dark:ring-purple-400/20",
    blue: "bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 ring-blue-600/10 dark:ring-blue-400/20"
  };
  if (!color) {
    const colorOptions = ["green", "indigo", "red", "zinc", "yellow", "pink", "purple", "blue"];
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    color = colorOptions[randomIndex];
  }
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  return `<span class="${"inline-flex whitespace-nowrap capitalize items-center rounded-md px-0.75 xs:px-1 py-0.25 xs:py-0.5 text-2xs xs:text-xs font-normal xs:font-medium ring-1 ring-inset dark:ring-2 " + escape(colorClasses[color], true) + " " + escape(classes, true)}">${escape(label)}</span>`;
});
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
function lightable(value) {
  function subscribe2(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe: subscribe2 };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
function builder(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
const overridable = (store, onChange) => {
  const update2 = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update2(() => curr);
  };
  return {
    ...store,
    update: update2,
    set
  };
};
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function generateId() {
  return nanoid(10);
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*"
};
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^Mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  onDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function effect(stores, fn) {
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  onDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  const portalParent = getPortalParent(node);
  if (portalProp !== void 0)
    return portalProp;
  if (portalParent === "body")
    return document.body;
  return null;
}
const documentClickStore = readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerdown", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const useClickOutside = (node, config = {}) => {
  let options = { enabled: true, ...config };
  function isEnabled() {
    return typeof options.enabled === "boolean" ? options.enabled : get_store_value(options.enabled);
  }
  const unsubscribe = documentClickStore.subscribe((e) => {
    if (!isEnabled() || !e || e.target === node) {
      return;
    }
    const composedPath = e.composedPath();
    if (composedPath.includes(node))
      return;
    if (options.ignore) {
      if (isFunction(options.ignore)) {
        if (options.ignore(e))
          return;
      } else if (Array.isArray(options.ignore)) {
        if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
          return ignoreEl && (e.target === ignoreEl || composedPath.includes(ignoreEl));
        }))
          return;
      }
    }
    options.handler?.(e);
  });
  return {
    update(params) {
      options = { ...options, ...params };
    },
    destroy() {
      unsubscribe();
    }
  };
};
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  node.dataset.escapee = "";
  let options = { enabled: true, ...config };
  function isEnabled() {
    return typeof options.enabled === "boolean" ? options.enabled : get_store_value(options.enabled);
  }
  const unsubscribe = documentEscapeKeyStore.subscribe((e) => {
    if (!e || !isEnabled())
      return;
    const target = e.target;
    if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
      return;
    }
    if (options.ignore) {
      if (isFunction(options.ignore)) {
        if (options.ignore(e))
          return;
      } else if (Array.isArray(options.ignore)) {
        if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
          return ignoreEl && target === ignoreEl;
        }))
          return;
      }
    }
    options.handler?.(e);
  });
  return {
    update(params) {
      options = { ...options, ...params };
    },
    destroy() {
      node.removeAttribute("data-escapee");
      unsubscribe();
    }
  };
};
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const defaultConfig = {
  floating: {},
  focusTrap: {},
  clickOutside: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    const portal = usePortal(popperElement, opts.portal);
    if (portal?.destroy) {
      callbacks.push(portal.destroy);
    }
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    const usedFocusTrap = useFocusTrap(popperElement);
    if (usedFocusTrap?.destroy) {
      callbacks.push(usedFocusTrap.destroy);
    }
  }
  if (opts.clickOutside !== null) {
    callbacks.push(useClickOutside(popperElement, {
      enabled: open,
      handler: (e) => {
        if (e.defaultPrevented)
          return;
        if (isHTMLElement(anchorElement) && !anchorElement.contains(e.target)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      ...opts.clickOutside
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: (e) => {
        if (e.defaultPrevented)
          return;
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update2(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update2(target);
  return {
    update: update2,
    destroy
  };
};
const defaults$1 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false
};
const { name: name$1 } = createElHelpers("popover");
function createPopover(args) {
  const withDefaults = { ...defaults$1, ...args };
  const options = toWritableStores(omit(withDefaults, "open"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = writable(null);
  const ids = {
    content: generateId(),
    trigger: generateId()
  };
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(ids.trigger);
    if (triggerEl) {
      tick().then(() => {
        triggerEl.focus();
      });
    }
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = builder(name$1("content"), {
    stores: [isVisible, portal],
    returned: ([$isVisible, $portal]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: ids.content,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": $portal ? "" : void 0
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        const popper = usePopper(node, {
          anchorElement: $activeTrigger,
          open,
          options: {
            floating: $positioning,
            focusTrap: $disableFocusTrap ? null : void 0,
            clickOutside: $closeOnOutsideClick ? void 0 : null,
            escapeKeydown: $closeOnEscape ? {
              handler: () => {
                handleClose();
              }
            } : null,
            portal: getPortalDestination(node, $portal)
          }
        });
        if (popper && popper.destroy) {
          unsubPopper = popper.destroy;
        }
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev) => {
      return !prev;
    });
    if (triggerEl) {
      activeTrigger.set(triggerEl);
    }
  }
  const trigger = builder(name$1("trigger"), {
    stores: open,
    returned: ($open) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        "data-state": $open ? "open" : "closed",
        "aria-controls": ids.content,
        id: ids.trigger
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const arrow2 = builder(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = builder(name$1("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick().then(() => {
          const triggerEl = document.getElementById(ids.trigger);
          if (!isHTMLElement(triggerEl))
            return;
          activeTrigger.set(triggerEl);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close
    },
    states: {
      open
    },
    options
  };
}
function multiplier(x) {
  const parts = x.toString().split(".");
  if (parts.length < 2) {
    return 1;
  }
  return Math.pow(10, parts[1].length);
}
function correctionFactor(...args) {
  return Math.max(...args.map(multiplier));
}
function add(...args) {
  const factor = correctionFactor(...args);
  let sum = 0;
  for (const number of args) {
    sum += number * factor;
  }
  return sum / factor;
}
function sub(...[first, ...args]) {
  const factor = correctionFactor(...args);
  let sum = first * factor;
  for (const number of args) {
    sum -= number * factor;
  }
  return sum / factor;
}
function mul(...args) {
  let total = 1;
  for (const number of args) {
    const factor = correctionFactor(total, number);
    total = total * factor * (number * factor) / (factor * factor);
  }
  return total;
}
function div(...[first, ...args]) {
  let total = first;
  for (const number of args) {
    const factor = correctionFactor(total, number);
    total = total * factor / (number * factor);
  }
  return total;
}
const defaults = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  disabled: false
};
const { name } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = writable(false);
  const currentThumbIndex = writable(0);
  const activeThumb = writable(null);
  const ids = {
    root: generateId()
  };
  const root = builder(name(), {
    stores: [disabled, orientation],
    returned: ([$disabled, $orientation]) => {
      return {
        disabled: disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : "touch-action: none;",
        "data-melt-id": ids.root
      };
    }
  });
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = mul(div(sub(val, $min), sub($max, $min)), 100);
      return pos;
    };
  });
  const range = builder(name("range"), {
    stores: [value, orientation, position],
    returned: ([$value, $orientation, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const orientationStyles = $orientation === "horizontal" ? { left: `${minimum}%`, right: `${maximum}%` } : { top: `${maximum}%`, bottom: `${minimum}%` };
      return {
        style: styleToString({
          position: "absolute",
          ...orientationStyles
        })
      };
    }
  });
  const updatePosition = (val, index) => {
    value.update((prev) => {
      if (!prev)
        return [val];
      const newValue = [...prev];
      const direction = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction];
        newValue[index + direction] = val;
        const thumbs = getAllThumbs();
        if (thumbs) {
          thumbs[index + direction].focus();
          activeThumb.set({ thumb: thumbs[index + direction], index: index + direction });
        }
      }
      if (direction === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = get_store_value(min);
      const $max = get_store_value(max);
      newValue[index] = Math.min(Math.max(val, $min), $max);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(ids.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb2) => isHTMLElement(thumb2));
  };
  const thumb = builder(name("thumb"), {
    stores: [value, position, min, max, disabled, orientation],
    returned: ([$value, $position, $min, $max, $disabled, $orientation]) => {
      let index = -1;
      return () => {
        index++;
        const currentThumb = get_store_value(currentThumbIndex);
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev) => prev + 1);
        }
        const thumbPosition = `${$position($value[index])}%`;
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": $value[index],
          "data-melt-part": "thumb",
          style: styleToString({
            position: "absolute",
            ...$orientation === "horizontal" ? { left: thumbPosition, translate: "-50% 0" } : { bottom: thumbPosition, translate: "0 50%" }
          }),
          tabindex: $disabled ? -1 : 0
        };
      };
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        const $min = get_store_value(min);
        const $max = get_store_value(max);
        if (get_store_value(disabled))
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs = getAllThumbs();
        if (!thumbs?.length)
          return;
        const index = thumbs.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $step = get_store_value(step);
        const $value = get_store_value(value);
        const $orientation = get_store_value(orientation);
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              updatePosition($min, index);
            } else if ($value[index] > $min) {
              const newValue = sub($value[index], $step);
              updatePosition(newValue, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              updatePosition($max, index);
            } else if ($value[index] < $max) {
              const newValue = add($value[index], $step);
              updatePosition(newValue, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              updatePosition($max, index);
            } else if ($value[index] > $min && $orientation === "vertical") {
              const newValue = add($value[index], $step);
              updatePosition(newValue, index);
            } else if ($value[index] < $max) {
              const newValue = add($value[index], $step);
              updatePosition(newValue, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              updatePosition($min, index);
            } else if ($value[index] < $max && $orientation === "vertical") {
              const newValue = sub($value[index], $step);
              updatePosition(newValue, index);
            } else if ($value[index] > $min) {
              const newValue = sub($value[index], $step);
              updatePosition(newValue, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = derived([min, max, step], ([$min, $max, $step]) => {
    const difference = sub($max, $min);
    let count = Math.ceil(div(difference, $step));
    if (difference % $step == 0) {
      count++;
    }
    return count;
  });
  const tick2 = builder(name("tick"), {
    stores: [ticks, value, min, max, step, orientation],
    returned: ([$ticks, $value, $min, $max, $step, $orientation]) => {
      let index = -1;
      return () => {
        index++;
        const horizontal = $orientation === "horizontal";
        const style = {
          position: "absolute"
        };
        const positionPercentage = mul(index, div($step, sub($max, $min)), 100);
        style[horizontal ? "left" : "bottom"] = `${positionPercentage}%`;
        if (index === $ticks - 1) {
          style.translate = horizontal ? "-100% 0" : "0 100%";
        } else if (index !== 0) {
          style.translate = horizontal ? "-50% 0" : "0 50%";
        }
        const tickValue = add($min, mul(index, $step));
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          style: styleToString(style)
        };
      };
    }
  });
  effect([root, min, max, disabled, orientation, step], ([$root, $min, $max, $disabled, $orientation, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, leftOrBottom, rightOrTop) => {
      const percent = div(sub(clientXY, leftOrBottom), sub(rightOrTop, leftOrBottom));
      const val = add(mul(percent, sub($max, $min)), $min);
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const newValue = mul(Math.round(div(val, step2)), step2);
        updatePosition(newValue, activeThumbIdx);
      }
    };
    const getClosestThumb = (e) => {
      const thumbs = getAllThumbs();
      if (!thumbs)
        return;
      thumbs.forEach((thumb3) => thumb3.blur());
      const distances = thumbs.map((thumb3) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb3.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb3.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb2 = thumbs[distances.indexOf(Math.min(...distances))];
      const index = thumbs.indexOf(thumb2);
      return { thumb: thumb2, index };
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target))
        return;
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      if ($orientation === "horizontal") {
        const { left, right } = sliderEl.getBoundingClientRect();
        applyPosition(e.clientX, closestThumb.index, left, right);
      } else {
        const { top, bottom } = sliderEl.getBoundingClientRect();
        applyPosition(e.clientY, closestThumb.index, bottom, top);
      }
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const pointerMove = (e) => {
      if (!get_store_value(isActive))
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = get_store_value(activeThumb);
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      if ($orientation === "horizontal") {
        const { left, right } = sliderEl.getBoundingClientRect();
        applyPosition(e.clientX, closestThumb.index, left, right);
      } else {
        const { top, bottom } = sliderEl.getBoundingClientRect();
        applyPosition(e.clientY, closestThumb.index, bottom, top);
      }
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  return {
    elements: {
      root,
      thumb,
      range,
      tick: tick2
    },
    states: {
      value,
      ticks
    },
    options
  };
};
const User_card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userProfileStore, $$unsubscribe_userProfileStore;
  let $trigger, $$unsubscribe_trigger;
  let $open, $$unsubscribe_open;
  let $content, $$unsubscribe_content;
  let $arrow, $$unsubscribe_arrow;
  let $close, $$unsubscribe_close;
  $$unsubscribe_userProfileStore = subscribe(userProfileStore, (value) => $userProfileStore = value);
  const { elements: { trigger, content, arrow: arrow2, close }, states: { open } } = createPopover({
    forceVisible: true,
    positioning: { placement: "top-end" },
    arrowSize: 8
  });
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_arrow = subscribe(arrow2, (value) => $arrow = value);
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  let { accessToken } = $$props;
  let { classes } = $$props;
  if ($$props.accessToken === void 0 && $$bindings.accessToken && accessToken !== void 0)
    $$bindings.accessToken(accessToken);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  $$unsubscribe_userProfileStore();
  $$unsubscribe_trigger();
  $$unsubscribe_open();
  $$unsubscribe_content();
  $$unsubscribe_arrow();
  $$unsubscribe_close();
  return `${!$userProfileStore?.display_name ? `<div class="${escape(classes, true) + " flex animate-pulse items-center h-14 w-full sm:w-[400px] rounded-2xl p-2 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700"}"><span class="rounded-lg w-10 h-10 min-h-10 min-w-10 bg-gray-200 dark:bg-zinc-800"></span> <div class="flex flex-col ml-2 grow" data-svelte-h="svelte-p96ds8"><span class="grow h-1 bg-zinc-800 rounded-full"></span> <span class="grow mt-2 h-1 bg-zinc-800 rounded-full"></span> <span class="grow mt-2 h-1 bg-zinc-800 rounded-full"></span></div></div>` : `<button${spread(
    [
      { type: "button" },
      {
        class: escape(classes, true) + " flex h-3.5 w-3.5 min-h-3.5 min-w-[28px] sm:h-4 sm:w-4 sm:min-h-4 sm:min-w-[32px] items-center justify-center rounded-lg bg-neutral-100"
      },
      escape_object($trigger),
      {
        "aria-label": "Open Spotify profile card"
      }
    ],
    {}
  )}><img${add_attribute("src", $userProfileStore.images[0].url, 0)} alt="Avatar" class="h-full w-full rounded-[inherit] object-cover bg-center"> <span class="sr-only" data-svelte-h="svelte-joms16">Open Popover</span></button> ${$open ? `<div${spread(
    [
      escape_object($content),
      {
        class: "flex relative items-center shadow-xl px-2 h-14 w-fit rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700"
      }
    ],
    {}
  )}><div${spread(
    [
      escape_object($arrow),
      {
        class: "border-t-2 border-l-2 border-zinc-200 dark:border-zinc-700"
      }
    ],
    {}
  )}></div> <div class="flex items-center "><img${add_attribute("src", $userProfileStore.images[1].url, 0)} alt="profile" class="rounded-lg w-10 h-10 min-h-10 min-w-10 object-cover bg-center ring-2 ring-zinc-200 dark:ring-zinc-700"> <div class="flex flex-col ml-2 "><a${add_attribute("href", $userProfileStore.external_urls.spotify, 0)} target="_blank" title="Open Spotify profile" class="group text-lg lg:text-2xl flex items-center font-bold dark:text-white hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">${escape($userProfileStore.display_name)} ${validate_component(ExternalLink, "ExternalLink").$$render($$result, { class: "h-2 w-2 ml-1" }, {}, {})}</a> <div class="flex items-center mt-0.5">${$userProfileStore.product === "premium" ? `${validate_component(Tag, "Tag").$$render(
    $$result,
    {
      color: "red",
      label: $userProfileStore.product
    },
    {},
    {}
  )}` : `${validate_component(Tag, "Tag").$$render(
    $$result,
    {
      color: "green",
      label: $userProfileStore.product
    },
    {},
    {}
  )}`} ${validate_component(Tag, "Tag").$$render(
    $$result,
    {
      color: "zinc",
      classes: "ml-1",
      label: $userProfileStore.country
    },
    {},
    {}
  )}</div> <h5 class="text-xs mt-1 font-semibold dark:text-zinc-500">${escape($userProfileStore.followers.total)}
                        Followers</h5></div></div> <button${spread([{ class: "absolute bottom-1 right-1" }, escape_object($close)], {})}>${validate_component(X$1, "X").$$render($$result, { class: "square-2 dark:text-white" }, {}, {})}</button></div>` : ``}`}`;
});
const updateInterval = 1e3;
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let __MELTUI_BUILDER_0__;
  let $thumb, $$unsubscribe_thumb;
  let $playerState, $$unsubscribe_playerState;
  let $currentTime, $$unsubscribe_currentTime;
  let $progress, $$unsubscribe_progress;
  let $range, $$unsubscribe_range;
  let $root, $$unsubscribe_root;
  let { classes = "" } = $$props;
  let { playerState = writable(null) } = $$props;
  $$unsubscribe_playerState = subscribe(playerState, (value) => $playerState = value);
  const dispatch = createEventDispatcher();
  let progress = writable([
    $playerState ? $playerState?.position * 100 / $playerState?.duration : 0
  ]);
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  let currentTime = writable($playerState?.position || 0);
  $$unsubscribe_currentTime = subscribe(currentTime, (value) => $currentTime = value);
  lodash?.debounce(
    () => {
      const rangePosition = $range?.style?.split("right:")?.[1]?.split("%")?.[0];
      const position = 100 - parseFloat(rangePosition, 10);
      seekPosition(position);
    },
    500
  );
  const seekPosition = async (position) => {
    if ($playerState) {
      const newPosition = $playerState.duration * position / 100;
      dispatch("seek", newPosition);
    }
  };
  setInterval(
    () => {
      if ($playerState && !$playerState.paused && $progress[0] < 100) {
        progress.set([$progress[0] + updateInterval / $playerState.duration * 100]);
        currentTime.set($currentTime + updateInterval);
      }
    },
    updateInterval
  );
  const { elements: { root, range, thumb } } = createSlider({
    disabled: !!$playerState,
    defaultValue: [0],
    value: progress,
    max: 100,
    step: 1
  });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  $$unsubscribe_thumb = subscribe(thumb, (value) => $thumb = value);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.playerState === void 0 && $$bindings.playerState && playerState !== void 0)
    $$bindings.playerState(playerState);
  {
    {
      progress.set([
        $playerState ? $playerState?.position * 100 / $playerState?.duration : 0
      ]);
      currentTime.set($playerState?.position || 0);
    }
  }
  __MELTUI_BUILDER_0__ = $thumb();
  $$unsubscribe_thumb();
  $$unsubscribe_playerState();
  $$unsubscribe_currentTime();
  $$unsubscribe_progress();
  $$unsubscribe_range();
  $$unsubscribe_root();
  return `<div class="${"flex flex-col items-center lg:flex-col-reverse " + escape(classes, true)}"><span${spread(
    [
      escape_object($root),
      { role: "slider" },
      {
        "aria-roledescription": "slider position"
      },
      { "aria-valuemax": "100" },
      { "aria-valuemin": "0" },
      { tabindex: "0" },
      {
        "aria-valuenow": escape_attribute_value($progress[0])
      },
      {
        class: "relative flex h-1 w-full sm:w-[calc(100%-80px)] group cursor-pointer items-center transition-width ease-linear duration-300"
      }
    ],
    {}
  )}><span class="block h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full"><span${spread(
    [
      escape_object($range),
      {
        class: "h-1 bg-zinc-400 dark:bg-zinc-500 rounded-full !min-w-[8px] dark:group-hover:bg-zinc-400"
      }
    ],
    {}
  )}></span></span> <span${spread(
    [
      { tabindex: "0" },
      { role: "slider" },
      {
        "aria-roledescription": "slider position"
      },
      { "aria-valuemax": "100" },
      { "aria-valuemin": "0" },
      {
        "aria-valuenow": escape_attribute_value($progress[0])
      },
      escape_object(__MELTUI_BUILDER_0__),
      {
        class: "hidden group-hover:block focus:block h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-white focus:ring-2 focus:ring-black/40"
      }
    ],
    {}
  )}></span></span> <div class="flex items-center w-full justify-between mt-0.5 mb-0 sm:-mt-1.5 lg:-mb-1.5 lg:mt-0"><span class="text-xs text-zinc-400 dark:text-zinc-500">${escape(dayjs($currentTime).format("m:ss"))}</span> <span class="text-xs text-zinc-400 dark:text-zinc-500">${escape(dayjs($playerState?.duration || 0).format("m:ss"))}</span></div></div>`;
});
const volumeClasses = "w-2 h-2 sm:w-2.5 sm:h-2.5 dark:text-white group-hover:text-zinc-500 dark:group-hover:text-zinc-300";
const Sound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let __MELTUI_BUILDER_0__;
  let $thumb, $$unsubscribe_thumb;
  let $newVolume, $$unsubscribe_newVolume;
  let $trigger, $$unsubscribe_trigger;
  let $open, $$unsubscribe_open;
  let $content, $$unsubscribe_content;
  let $arrow, $$unsubscribe_arrow;
  let $root, $$unsubscribe_root;
  let $range, $$unsubscribe_range;
  let $close, $$unsubscribe_close;
  let { volume } = $$props;
  let { classes } = $$props;
  let newVolume = writable([volume]);
  $$unsubscribe_newVolume = subscribe(newVolume, (value) => $newVolume = value);
  const { elements: { trigger, content, arrow: arrow2, close }, states: { open } } = createPopover({
    forceVisible: true,
    positioning: { placement: "top-end" }
  });
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_arrow = subscribe(arrow2, (value) => $arrow = value);
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const { elements: { root, range, thumb } } = createSlider({
    defaultValue: [0],
    value: newVolume,
    min: 0,
    max: 1,
    step: 0.01
  });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  $$unsubscribe_thumb = subscribe(thumb, (value) => $thumb = value);
  const dispatch = createEventDispatcher();
  const setVolume = async (volume2) => {
    dispatch("setVolume", { volume: volume2 });
  };
  lodash?.debounce(
    () => {
      setVolume($newVolume[0]);
    },
    500
  );
  if ($$props.volume === void 0 && $$bindings.volume && volume !== void 0)
    $$bindings.volume(volume);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  __MELTUI_BUILDER_0__ = $thumb();
  $$unsubscribe_thumb();
  $$unsubscribe_newVolume();
  $$unsubscribe_trigger();
  $$unsubscribe_open();
  $$unsubscribe_content();
  $$unsubscribe_arrow();
  $$unsubscribe_root();
  $$unsubscribe_range();
  $$unsubscribe_close();
  return ` <button${spread(
    [
      { type: "button" },
      { class: escape(classes, true) + " group" },
      escape_object($trigger),
      { "aria-label": "Update dimensions" }
    ],
    {}
  )}>${$newVolume[0] === 0 ? `${validate_component(VolumeX, "VolumeX").$$render($$result, { class: volumeClasses }, {}, {})}` : `${$newVolume[0] < 0.5 ? `${validate_component(Volume1, "Volume1").$$render($$result, { class: volumeClasses }, {}, {})}` : `${$newVolume[0] < 1 ? `${validate_component(Volume2, "Volume2").$$render($$result, { class: volumeClasses }, {}, {})}` : `${validate_component(Volume2, "Volume2").$$render($$result, { class: volumeClasses }, {}, {})}`}`}`} <span class="sr-only" data-svelte-h="svelte-joms16">Open Popover</span></button> ${$open ? `<div${spread(
    [
      escape_object($content),
      {
        class: "relative p-2 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700"
      }
    ],
    {}
  )}><div${spread(
    [
      escape_object($arrow),
      {
        class: "border-t-2 border-l-2 border-zinc-200 dark:border-zinc-700"
      }
    ],
    {}
  )}></div> <span${spread(
    [
      escape_object($root),
      { role: "slider" },
      {
        "aria-roledescription": "slider position"
      },
      { "aria-valuemax": "100" },
      { "aria-valuemin": "0" },
      { tabindex: "0" },
      {
        "aria-valuenow": escape_attribute_value($newVolume[0])
      },
      {
        class: "relative flex w-20 h-0.5 group cursor-pointer items-center transition-width ease-linear duration-300"
      }
    ],
    {}
  )}><span class="block w-full h-0.5 bg-zinc-200 dark:bg-zinc-700 rounded-full"><span${spread(
    [
      escape_object($range),
      {
        class: "h-0.5 bg-zinc-400 dark:bg-zinc-500 rounded-full !min-w-[8px] dark:group-hover:bg-zinc-400"
      }
    ],
    {}
  )}></span></span> <span${spread(
    [
      { tabindex: "0" },
      { role: "slider" },
      {
        "aria-roledescription": "slider position"
      },
      { "aria-valuemax": "1" },
      { "aria-valuemin": "0" },
      {
        "aria-valuenow": escape_attribute_value($newVolume[0])
      },
      escape_object(__MELTUI_BUILDER_0__),
      {
        class: "block w-1 h-1.5 rounded-full bg-zinc-600 dark:bg-white focus:ring-2 focus:ring-zinc-950/40"
      }
    ],
    {}
  )}></span></span> <button${spread([{ class: "hidden absolute top-1 right-1" }, escape_object($close)], {})}>${validate_component(X$1, "X").$$render($$result, { class: "square-2" }, {}, {})}</button></div>` : ``}`;
});
const Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $player, $$unsubscribe_player;
  let $playerState, $$unsubscribe_playerState;
  let $likedTracks, $$unsubscribe_likedTracks;
  let $loadingPlayer, $$unsubscribe_loadingPlayer;
  let $loadingShuffle, $$unsubscribe_loadingShuffle;
  let $volume, $$unsubscribe_volume;
  let { accessToken } = $$props;
  let deviceId = null;
  let { currentTrack } = $$props;
  let { classes = "" } = $$props;
  let player = writable(null);
  $$unsubscribe_player = subscribe(player, (value) => $player = value);
  let playerState = writable(null);
  $$unsubscribe_playerState = subscribe(playerState, (value) => $playerState = value);
  let loadingPlayer = writable(false);
  $$unsubscribe_loadingPlayer = subscribe(loadingPlayer, (value) => $loadingPlayer = value);
  let loadingNextSong = writable(false);
  const digestNextSong = async (uri) => {
    return fetch("/api/spotify/playback/queue", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({ accessToken, uri })
    }).then((res) => res.json()).then(() => {
      return { success: true };
    }).catch((err) => {
      console.error(err);
      return { success: false };
    });
  };
  const makeDeviceActive = async () => {
    await fetch("/api/spotify/playback/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({ accessToken, deviceId })
    }).then((res) => res.json()).then(() => {
    }).catch((err) => {
      console.error(err);
    });
  };
  let likedTracks = writable({});
  $$unsubscribe_likedTracks = subscribe(likedTracks, (value) => $likedTracks = value);
  const fetchLikedStatus = async (trackId) => {
    return fetch("/api/spotify/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({ accessToken, trackIds: [trackId] })
    }).then((res) => res.json()).then((res) => {
      likedTracks.set({
        ...$likedTracks,
        [trackId]: res?.[0] ?? false
      });
      console.log("track is liked", $likedTracks);
    }).catch((err) => {
      console.error(err);
    });
  };
  const skipSong = async (direction) => {
    if (!$player) {
      console.error("Player is not defined");
      return;
    }
    loadingNextSong.set(true);
    if (direction === "next") {
      await $player.nextTrack().then(() => {
        loadingNextSong.set(false);
      });
    } else {
      await $player.previousTrack().then(() => {
        loadingNextSong.set(false);
      });
    }
  };
  let loadingShuffle = writable(false);
  $$unsubscribe_loadingShuffle = subscribe(loadingShuffle, (value) => $loadingShuffle = value);
  let volume = writable(0.5);
  $$unsubscribe_volume = subscribe(volume, (value) => $volume = value);
  if ($$props.accessToken === void 0 && $$bindings.accessToken && accessToken !== void 0)
    $$bindings.accessToken(accessToken);
  if ($$props.currentTrack === void 0 && $$bindings.currentTrack && currentTrack !== void 0)
    $$bindings.currentTrack(currentTrack);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (currentTrack && currentTrack.detail && $player) {
          if (!$likedTracks?.[currentTrack?.detail.id]) {
            fetchLikedStatus(currentTrack.detail.id);
          }
          $player.getCurrentState().then(async (state) => {
            if (!state) {
              console.error("User is not playing music through the Web Playback SDK");
              await makeDeviceActive();
            }
            const success = await digestNextSong(currentTrack.detail.uri);
            if (success) {
              currentTrack = null;
              await skipSong("next");
            } else {
              console.error("failed to add song to queue");
            }
          });
        }
      }
    }
    {
      {
        if ($player) {
          $player.getVolume().then((volume2) => {
            console.log("setting volume", volume2);
          });
        }
      }
    }
    $$rendered = `<div id="portal" class="${"flex lg:flex-row flex-col w-fit lg:justify-between items-center px-2 sm:px-4 lg:px-2 py-2 lg:py-0 h-[212px] lg:h-14 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 ease-linear " + escape(classes, true)}">${$playerState?.track_window?.current_track && !$loadingPlayer ? `<div class="flex items-center justify-between mr-0 w-full lg:w-[500px] lg:min-w-[500px]"><div class="flex items-center"><img${add_attribute("src", $playerState?.track_window?.current_track?.album?.images[0]?.url, 0)} alt="Album cover" class="w-12 h-12 lg:w-10 lg:h-10 rounded-lg border-2 border-zinc-200 dark:border-zinc-700"> <div class="flex flex-col ml-2"><span class="dark:text-white font-semibold tracking-wide text-base lg:text-lg">${escape($playerState?.track_window?.current_track?.name)}</span> <div class="flex items-center flex-wrap">${each($playerState?.track_window?.current_track?.artists, (artist, index) => {
      return `<a${add_attribute("href", artist.external_urls?.spotify ?? artist.href, 0)} target="_blank" title="Open Spotify artist" class="group whitespace-break-spaces inline-flex items-center cursor-pointer tracking-tight text-sm sm:text-base text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-300 ease-in duration-100">${escape(artist.name)} ${index !== $playerState?.track_window?.current_track?.artists.length - 1 ? `<span class="mr-0.5" data-svelte-h="svelte-on5gwc">,</span>` : ``} </a>`;
    })}</div></div></div> <div class="flex"><div class="flex flex-col items-center justify-center">${validate_component(Heart$1, "Heart").$$render(
      $$result,
      {
        class: $likedTracks?.[$playerState?.track_window.current_track.id] ? "h-3.5 w-3.5 fill-green-500 dark:fill-green-300 text-white dark:text-zinc-900" : "h-3 w-3 text-zinc-950 dark:text-zinc-700"
      },
      {},
      {}
    )}</div> <span class="hidden lg:flex mx-4 h-10 w-0.25 rounded-full bg-zinc-200 dark:bg-zinc-700"></span></div></div>` : `<div class="flex w-full h-12 py-1 animate-pulse-3 items-center" data-svelte-h="svelte-1bgmrej"><span class="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-zinc-300 dark:bg-zinc-800"></span> <div class="flex flex-col ml-2 grow"><span class="bg-zinc-300 dark:bg-zinc-800 h-2 rounded-full w-2/3"></span> <span class="bg-zinc-300 dark:bg-zinc-800 mt-2 h-1 rounded-full w-1/2"></span></div></div>`} <div class="flex flex-col-reverse lg:flex-col w-full lg:w-full transition-width ease-linear duration-300"><div class="flex w-full items-center justify-between">${validate_component(User_card, "UserCard").$$render(
      $$result,
      { accessToken },
      {
        accessToken: ($$value) => {
          accessToken = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="flex w-full items-center justify-center lg:mt-0"><button class="mr-2 sm:mr-4 p-0.5 group cursor-pointer">${validate_component(Shuffle$1, "Shuffle").$$render(
      $$result,
      {
        class: "w-1.5 h-1.5 sm:w-2 sm:h-2 group-hover:text-green-600 dark:group-hover:text-green-300 " + ($playerState?.shuffle ? "text-green-600 dark:text-green-300" : "text-zinc-950 dark:text-white") + " " + ($loadingShuffle && "animate-pulse-3 !text-green-300")
      },
      {},
      {}
    )}</button> <button class="group cursor-pointer">${validate_component(SkipBack, "SkipBack").$$render(
      $$result,
      {
        class: "w-2.5 h-2.5 sm:w-3 sm:h-3 dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"
      },
      {},
      {}
    )}</button> <button class="text-white mx-1.5 sm:mx-2 cursor-pointer rounded-full group p-0.5 flex items-center justify-center">${!$playerState || $playerState?.paused ? `${$loadingPlayer ? `${validate_component(Loader2, "Loader2").$$render(
      $$result,
      {
        class: "w-3 h-3 sm:w-4 sm:h-4 text-zinc-950 dark:text-white stroke-[2px] animate-spin"
      },
      {},
      {}
    )}` : `${validate_component(Play$1, "Play").$$render(
      $$result,
      {
        class: "h-3 w-3 sm:w-4 sm:h-4 pl-0.5 fill-zinc-950 text-zinc-950 dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
      },
      {},
      {}
    )}`}` : `${validate_component(Pause$1, "Pause").$$render(
      $$result,
      {
        class: "h-3 w-3 sm:w-4 sm:h-4 stroke-0 fill-zinc-950 text-white dark:text-white dark:fill-white group-hover:fill-zinc-600 dark:group-hover:fill-zinc-400"
      },
      {},
      {}
    )}`}</button> <button class="group cursor-pointer">${validate_component(SkipForward, "SkipForward").$$render(
      $$result,
      {
        class: "w-2.5 h-2.5 sm:w-3 sm:h-3 dark:text-white dark:fill-white stroke-[2px] group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 dark:group-hover:text-zinc-300"
      },
      {},
      {}
    )}</button> ${validate_component(Sound, "Sound").$$render(
      $$result,
      {
        volume: $volume,
        classes: "ml-3 sm:ml-3.5"
      },
      {},
      {}
    )}</div> <span class="h-4 w-4 rounded-lg bg-red-300"></span></div> ${validate_component(Progress, "Progress").$$render(
      $$result,
      {
        playerState,
        classes: "mb-1 mt-1 lg:mb-0"
      },
      {},
      {}
    )}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_player();
  $$unsubscribe_playerState();
  $$unsubscribe_likedTracks();
  $$unsubscribe_loadingPlayer();
  $$unsubscribe_loadingShuffle();
  $$unsubscribe_volume();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tokenStore, $$unsubscribe_tokenStore;
  let $activeTab, $$unsubscribe_activeTab;
  $$unsubscribe_tokenStore = subscribe(tokenStore, (value) => $tokenStore = value);
  let currentTrack;
  const activeTab = writable("artists");
  $$unsubscribe_activeTab = subscribe(activeTab, (value) => $activeTab = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` <div class="flex w-full h-full grow flex-col">${!$tokenStore?.accessToken?.token || dayjs().diff(dayjs($tokenStore?.refreshToken?.timestamp), "hour") > 1 ? `<div class="flex flex-col items-center">${validate_component(Loader, "LayeredLoader").$$render($$result, {}, {}, {})}</div>` : `${validate_component(Player, "Player").$$render(
      $$result,
      {
        classes: "w-full",
        accessToken: $tokenStore.accessToken.token,
        currentTrack
      },
      {
        accessToken: ($$value) => {
          $tokenStore.accessToken.token = $$value;
          $$settled = false;
        },
        currentTrack: ($$value) => {
          currentTrack = $$value;
          $$settled = false;
        }
      },
      {}
    )} <nav class="isolate flex lg:hidden w-full divide-x-2 divide-gray-200 dark:divide-zinc-700 rounded-xl overflow-hidden shadow-xl mt-1 sm:mt-2 border-2 border-zinc-200 dark:border-zinc-700" aria-label="Tabs"> <button class="${escape(
      $activeTab === "artists" ? "bg-zinc-100 dark:bg-zinc-700" : "bg-white dark:bg-zinc-900",
      true
    ) + " dark:text-white rounded-l-lg group relative min-w-0 flex-1 overflow-hidden py-1 px-1 text-center text-sm sm:text-base font-medium focus:z-10"}" aria-current="page"><span data-svelte-h="svelte-1im6vsj">Top artists</span></button> <button class="${escape(
      $activeTab === "tracks" ? "bg-zinc-100 dark:bg-zinc-700" : "bg-white dark:bg-zinc-900",
      true
    ) + " dark:text-white rounded-r-lg group relative min-w-0 flex-1 overflow-hidden py-1 px-1 text-center text-sm sm:text-base font-medium focus:z-10"}"><span data-svelte-h="svelte-1qi9soz">Top tracks</span></button></nav> <div class="flex w-full mt-1 sm:mt-2 items-center flex-col lg:flex-row">${``} ${``}</div>`}</div>`;
  } while (!$$settled);
  $$unsubscribe_tokenStore();
  $$unsubscribe_activeTab();
  return $$rendered;
});
export {
  Page as default
};
