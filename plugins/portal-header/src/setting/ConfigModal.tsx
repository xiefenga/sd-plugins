import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { Button, Form, Input, Modal, Switch } from 'antd'
import { useModal, antdModal } from '@ebay/nice-modal-react'

import { PluginConfig } from '@/types'
import ImageUpload from './ImageUpload'
import SubNavDrawer from './SubNavDrawer'

const ConfigButton = styled(Button).attrs({ type: 'primary', size: 'small' })``

interface ConfigModalProps {
  pluginConfig: Partial<PluginConfig>
  submitConfig: (config: any) => void
}

const ConfigModal: React.FC<ConfigModalProps> = (props) => {

  const { submitConfig, pluginConfig } = props

  const modal = useModal()

  const [logo, setLogo] = useState(pluginConfig.logo ?? '')

  // 本级
  const [isLevel, setIsLevel] = useState(pluginConfig.isLevel ?? false)

  const [searchUrl, setSearchUrl] = useState(pluginConfig.searchUrl)

  const [workbanchName, setWorkbanchName] = useState(pluginConfig.workbanchName)

  const [workbanchUrl, setWorkbanchUrl] = useState(pluginConfig.workbanchUrl)

  const [subNavs, setSubNavs] = useState(pluginConfig.subNavs ?? [])

  const onSwitchChange = (checked: boolean) => {
    setIsLevel(checked)
  }

  const onOk = () => {
    const config = { logo, isLevel, searchUrl, workbanchName, workbanchUrl, subNavs }
    const currentConfig = Object.entries(config)
      .filter(([_, val]) => !!val)
      .reduce((memo, [key, val]) => Object.assign({}, memo, { [key]: val }), {} as any)
    submitConfig(currentConfig)
    modal.hide()
  }

  const openSubNavConfigDrawer = () => {
    NiceModal.show(SubNavDrawer, {
      subNavs,
      setSubNavs,
    })
  }

  return (
    <Modal
      title="配置插件"
      destroyOnClose
      width={800}
      {...antdModal(modal)}
      onOk={onOk}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 6 }}>
        <Form.Item label='Logo'>
          <ImageUpload
            url={logo}
            tip='上传logo'
            setUrl={setLogo}
          />
        </Form.Item>
        <Form.Item label='本级'>
          <Switch
            checked={isLevel}
            checkedChildren='是'
            unCheckedChildren='否'
            onChange={onSwitchChange}
          />
        </Form.Item>
        {isLevel && (
          <Form.Item label='下级导航'>
            <ConfigButton onClick={openSubNavConfigDrawer}>
              点击配置
            </ConfigButton>
          </Form.Item>
        )}
        <Form.Item label='导航按钮'>
          <ConfigButton>
            点击配置
          </ConfigButton>
        </Form.Item>
        <Form.Item label='主题配置'>
          <ConfigButton>
            点击配置
          </ConfigButton>
        </Form.Item>
        <Form.Item label='搜索地址'>
          <Input
            size='small'
            value={searchUrl}
            onChange={e => setSearchUrl(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='工作台名称'>
          <Input
            size='small'
            value={workbanchName}
            onChange={e => setWorkbanchName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='工作台地址'>
          <Input
            size='small'
            value={workbanchUrl}
            onChange={e => setWorkbanchUrl(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NiceModal.create(ConfigModal) 