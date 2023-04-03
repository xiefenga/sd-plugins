import React from 'react'
import { useRef } from 'react'
import { login } from 'sd-dev-login'
import { useBoolean, useTitle } from 'ahooks'
import { Button, Form, Input, Layout, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import './app.less'
import './login-form.less'

interface PluginProps {
  appId: string
  pluginConfig: typeof import('../plugin.json').props.$config
}

interface FormParams {
  username: string
  password: string
}

const App: React.FC<PluginProps> = (props) => {

  const { pluginConfig, appId } = props

  const counterRef = useRef(0)

  const [logining, { setTrue, setFalse }] = useBoolean(false)

  useTitle(pluginConfig.pageTitle)

  const handleSubmit = async (params: FormParams) => {
    const account = {
      account: params.username,
      password: params.password,
    }

    try {
      setTrue()
      await login(account)
      message.success('登录成功')
      window.location.href = `/applicationview/content/view?appid=${appId}&type=view`
    } catch (error: any) {
      if (error.data?.code === 10180033) {
        counterRef.current++
        const messageInfo = counterRef.current < 5
          ? `用户名或密码错误${counterRef.current}次，连续错误5次后被锁定`
          : '用户已被锁定'
        message.error(messageInfo)
      } else {
        message.error(error?.data?.message ?? '系统异常')
      }
    } finally {
      setFalse()
    }
  }

  return (
    <Layout className='login-page'>
      <Layout.Content>
        <div className='center-box'>
          <div className='center-box-center'>
            <div className='login-zone'>
              <Form
                id='login-form'
                layout='vertical'
                requiredMark={false}
                className='login-form'
                onFinish={handleSubmit}
              >
                <div className='welcome'>
                  <div className='welcome-title'>
                    {pluginConfig.welcomeTitle}{' '}
                  </div>
                  <div className='welcome-line-short' />
                  <div className='welcome-line' />
                </div>

                <Form.Item
                  className='login-form-detail login-form-detail-user'
                  label='用户名'
                  name='username'
                  rules={[
                    { required: true, message: '请输入用户名' },
                  ]}
                >
                  <Input
                    autoComplete='off'
                    prefix={<UserOutlined />}
                    placeholder='请输入用户名'
                  />
                </Form.Item>

                <Form.Item
                  className='login-form-detail'
                  label='密码'
                  name='password'
                  rules={[
                    { required: true, message: '请输入密码' },
                  ]}
                >
                  <Input.Password
                    autoComplete='off'
                    visibilityToggle={false}
                    prefix={<LockOutlined />}
                    placeholder='请输入密码'
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    size='large'
                    type='primary'
                    htmlType='submit'
                    disabled={logining}
                    className='login-form-button'
                  >
                    登录
                  </Button>
                </Form.Item>
                <Form.Item>
                  <div className='login-form-bottom-text'>
                    <img
                      draggable={false}
                      src={pluginConfig.logoUrl}
                    />
                    <span>{pluginConfig.bottomText}</span>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <img 
          className='vedio-bg' 
          src={pluginConfig.bgUrl} 
        />
      </Layout.Content>
    </Layout>
  )
}

export default App