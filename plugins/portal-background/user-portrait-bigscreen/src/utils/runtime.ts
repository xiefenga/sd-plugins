
__webpack_require__.p = process.env.NODE_ENV === 'production'
  // @ts-expect-error
  ? document.currentScript?.src.replace(window.location.origin, '').replace(/\/js\/.*/, '/') ?? '/'
  : '/'

export {}