import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { HeaderConfig as PluginConfig } from 'portal-shared/configuration'

import ConfigModal from './ConfigModal'
import GlobalStyle from './GlobalStyle'


const attrd = styled(Button).attrs({ type: 'primary' })

const ModalButton = attrd`
  width: auto!important;
  height: auto!important;
  line-height: 1.5715!important;
  border-radius: 5px!important;
`

interface ConfigButtonProps {
  pluginConfig: Partial<PluginConfig>
  onConfigChange: (_: any) => void
}

const ConfigButton: React.FC<ConfigButtonProps> = (props) => {

  const { onConfigChange, pluginConfig } = props

  const openConfigModal = () => {
    NiceModal.show(ConfigModal, {
      pluginConfig,
      submitConfig(config: any) {
        onConfigChange(config)
      },
    })
  }

  return (
    <NiceModal.Provider>
      <GlobalStyle />
      <ModalButton onClick={openConfigModal}>
        打开配置弹窗
      </ModalButton>
    </NiceModal.Provider>
  )
}

export default ConfigButton