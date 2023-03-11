import React from 'react'
// @ts-expect-error
import DesignConfiguration from './components/designConfiguration'
import DefaultRender from './components/plugin'

const renderHashMap = {
  default: DefaultRender,
  dataConfiguration: DesignConfiguration,
}

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props)
    const { type } = props
    // @ts-expect-error
    const Render = renderHashMap[type || 'default']
    const options = {
      changeConfiguration: this.handleOptionsChange,
      configuration: this.handleConfiguration(),
      ...this.props,
    }
    this.state = {
      id: '',
      currentRender: <Render {...options}></Render>,
    }
    console.log('重新加载页面')
  }

  //处理配置更新
  handleOptionsChange = (pluginOptions: any) => {
    const {
      bigscreen: { updateBlockById, pluginDetailMap },
      block: {
        baseConfig: { id },
      },
    } = this.props
    const containerId = pluginOptions.containerId
    if (pluginOptions.containerId) {
      updateBlockById(containerId, {
        dataConfig: {
          configs: [
            {
              name: '网页',
              type: 0,
              value: pluginOptions.tabLink1,
            },
          ],
          defaultValue: null,
          defaultType: 3,
        },
      })
    }
    updateBlockById(id, { dataConfig: { pluginOptions: { ...pluginOptions } } })
    //调用加载器的run方法强制更新
    pluginDetailMap[`${id}-default`].detail.ref.current.run()
    console.log('更新数据-----')
  }

  //处理需要的变量
  handleConfiguration = () => {
    const { block } = this.props
    const { dataConfig } = block
    const { pluginOptions = {} } = dataConfig
    return pluginOptions
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.state.currentRender}
      </div>
    )
  }
}