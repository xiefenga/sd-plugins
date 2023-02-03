
declare module 'clean-terminal-webpack-plugin' {
  interface Options {
    message: string, 
    onlyInWatchMode: boolean, 
    skipFirstRun: boolean, 
    beforeCompile: boolean
  }
  export default class CleanTerminalPlugin {
    constructor(options?: Partial<Options>)
  }
}

declare module 'dynamic-public-path-plugin' {
  interface O {
    dynamicPublicPath: string
  }
  export default class dynamicPublicPath {
    
    constructor(_: O) {}
  }
}

interface Window {
  CUSTOM_PLUGIN?: Map<string, PluginRender>
}


