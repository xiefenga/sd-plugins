
const alertifyDefaults = {
  // dialogs defaults
  autoReset: true,
  basic: false,
  closable: true,
  closableByDimmer: true,
  invokeOnCloseOff: false,
  frameless: false,
  defaultFocusOff: false,
  maintainFocus: true, // <== global default not per instance, applies to all dialogs
  maximizable: true,
  modal: true,
  movable: true,
  moveBounded: false,
  overflow: true,
  padding: true,
  pinnable: true,
  pinned: true,
  preventBodyShift: false, // <== global default not per instance, applies to all dialogs
  resizable: true,
  startMaximized: false,
  transition: 'pulse',
  transitionOff: false,
  tabbable: 'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs

  // notifier defaults
  notifier: {
    // auto-dismiss wait time (in seconds)  
    delay: 5,
    // default position
    position: 'bottom-right',
    // adds a close button to notifier messages
    closeButton: false,
    // provides the ability to rename notifier classes
    classes: {
      base: 'alertify-notifier',
      prefix: 'ajs-',
      message: 'ajs-message',
      top: 'ajs-top',
      right: 'ajs-right',
      bottom: 'ajs-bottom',
      left: 'ajs-left',
      center: 'ajs-center',
      visible: 'ajs-visible',
      hidden: 'ajs-hidden',
      close: 'ajs-close',
    },
  },

  // language resources 
  glossary: {
    // dialogs default title
    title: 'AlertifyJS',
    // ok button text
    ok: 'OK',
    // cancel button text
    cancel: 'Cancel',
  },

  // theme settings
  theme: {
    // class name attached to prompt dialog input textbox.
    input: 'ajs-input',
    // class name attached to ok button
    ok: 'ajs-ok',
    // class name attached to cancel button 
    cancel: 'ajs-cancel',
  },
  // global hooks
  hooks: {
    // invoked before initializing any dialog
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
    preinit: function (instance: any) { },
    // invoked after initializing any dialog
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
    postinit: function (instance: any) { },
  },
}

type Content = string | HTMLElement

type Func = () => void

interface Notification {
  delay(wait: number): void
  dismiss(): void
  dismissOthers(): void
  push(content: Content, wait: number): void
  setContent(content: Content): void
  callback?: Func
  ondismiss?: Func
}

type Mutable<T> = {
  -readonly [p in keyof T]: T[p]
}

declare module 'alertifyjs' {
  export function alert()

  export const defaults = alertifyDefaults

  export function closeAll(except)

  export function confirm()

  export function dialog(name, Factory, transient, base)

  export function dismissAll()

  export function error(message, wait, callback)

  export function get(name, key)

  export function message(message, wait, callback)

  export function notify(message: Content, type: string, wait?: number, callback?: Func): Notification

  export function prompt()

  export function set(name, key, value)

  export function setting(name, key, value)

  export function success(message, wait, callback)

  export function warning(message, wait, callback)
}