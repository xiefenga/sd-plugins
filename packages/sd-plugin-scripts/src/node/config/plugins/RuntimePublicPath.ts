
// __webpack_require__.p = process.env.NODE_ENV === 'production'
//   ? document.currentScript?.src.replace(window.location.origin, '').replace(/\/js\/.*/, '/') ?? '/'
//   : '/'

import { Compiler } from 'webpack'

class RuntimePublicPath {

  public apply(compiler: Compiler) :void {
    compiler.hooks
  }

}

export default RuntimePublicPath