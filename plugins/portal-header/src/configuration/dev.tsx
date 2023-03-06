import 'antd/dist/antd.css'
import styled from 'styled-components'
import { ConfigRender } from 'portal-shared'
import { createRoot } from 'react-dom/client'

import Configuration from './Configuration'

const Div = styled.div`
  width: 228px;
  padding: 56px 16px 0;
  box-sizing: content-box;
  background-color: #f0f2f5;
  height: calc(100vh - 56px);
  margin-left: auto;
`

const Title = styled.div`
  height: 36px;
  margin-bottom: 16px;
`

const Menu = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid rgba(4,84,242,.1);
  border-radius: 4px;
  padding: 10px 8px;
  margin-bottom: 32px;

  > div {
    background-color: #fff;
    border: none;
    color: #555;
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      color: #0454f2;
      border-left: 1px solid #ccc;
      position: relative;
      &::after {
        background-color: #0454f2;
        border-radius: 2px;
        bottom: -10px;
        box-shadow: 0 4px 4px rgb(4 84 242 / 20%);
        content: "";
        display: block;
        height: 3px;
        left: 50%;
        margin-left: -12px;
        position: absolute;
        width: 24px;
      }
    }
  }
`

export default () => {

  createRoot(document.getElementById('root')!)
    .render(
      <Div>
        <Menu>
          <div>选择组件</div>
          <div>组件内容</div>
        </Menu>
        <Title>外部自定义配置</Title>
        <ConfigRender Configuration={Configuration} />
      </Div>
    )
}