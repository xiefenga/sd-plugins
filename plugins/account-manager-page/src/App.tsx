import { useMount } from 'ahooks'
import React, { useState } from 'react'
import intl from 'react-intl-universal'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider, message } from 'antd'
import NiceModal from '@ebay/nice-modal-react'

import PluginContext from '@/context/Plugin'
import UserTable from '@/components/UserTable'
import { CurrentUserResp } from '@/types/api/account'
import { identifyPermission, authorityUser, getDeployMode } from '@/api/account'

const zh = require.context('./locale/zh', false, /.json/)

const zh_CN = zh.keys().reduce((memo, key) => Object.assign(memo, zh(key)), {})

intl.init({
  locales: { zh_CN },
  currentLocale: 'zh_CN',
})

interface PluginProps {
  assetId: string
}

const App: React.FC<PluginProps> = ({ assetId }) => {

  const [permission, setPermission] = useState<string[]>([])

  const [currentUser, setCurrentUser] = useState<CurrentUserResp>()

  const [deployMode, setDeployMode] = useState('')

  const loadPermission = async () => {
    const code = 'c7e9352b67f4e44e'
    try {
      const permission = await identifyPermission(code)
      setPermission(permission)
    } catch (err: any) {
      message.error(err.data.message)
      console.log(err)
      location.href = '/'
    }
  }

  const loadCurrentUser = async () => {
    try {
      const current = await authorityUser()
      setCurrentUser(current)
    } catch (_error) {
      // 
    }
  }

  const loadDeployMode = async () => {
    const deployMode = await getDeployMode()
    setDeployMode(deployMode)
  }

  useMount(() => {
    loadPermission()
    loadCurrentUser()
    loadDeployMode()
  })

  return (
    <ConfigProvider locale={zhCN}>
      <PluginContext.Provider value={{ assetId }}>
        <NiceModal.Provider>
          <UserTable 
            deployMode={deployMode}
            permission={permission} 
            currentUser={currentUser}
          />
        </NiceModal.Provider>
      </PluginContext.Provider>
    </ConfigProvider>
  )
}

export default App
