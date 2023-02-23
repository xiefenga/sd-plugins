import { Button } from 'antd'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'

import { PluginConfig } from '@/types'
import ConfigModal from './components/ConfigModal'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const _Title = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin-right: auto;
`

const attrd = styled(Button).attrs({ type: 'primary' })

const ModalButton = attrd`
  width: auto!important;
  height: auto!important;
  line-height: 1.5715!important;
  border-radius: 5px!important;
`

interface SettingProps {
  pluginConfig: Partial<PluginConfig>
  onConfigChange: (_: any) => void
}

const Setting: React.FC<SettingProps> = (props) => {

  console.log(props)

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
      <Wrapper>
        <ModalButton onClick={openConfigModal}>
          打开配置弹窗
        </ModalButton>
      </Wrapper>
    </NiceModal.Provider>
  )
}

export default Setting