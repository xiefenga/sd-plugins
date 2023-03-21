
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