import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { AccordionConfig as PluginConfig } from 'portal-shared'

import ConfigModal from './ConfigModal'

interface ConfigButtonProps {
  pluginConfig: Partial<PluginConfig>
  onConfigChange: (_: PluginConfig) => void
}

const ModalButton = styled(Button).attrs({ type: 'primary' })`
  width: auto!important;
  height: auto!important;
  line-height: 1.5715!important;
  border-radius: 5px!important;
`

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
      <ModalButton onClick={openConfigModal}>
        打开配置弹窗
      </ModalButton>
    </NiceModal.Provider>
  )
}

export default ConfigButton