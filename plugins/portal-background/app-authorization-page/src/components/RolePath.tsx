import React from 'react'
import { Breadcrumb } from 'antd'
import styled from 'styled-components'

const StyledBreadcrumb = styled(Breadcrumb)`
  .active {
    color: #5182E4;
  }

  .current {
    color: #999999;
  }
`

interface RolePathProps {
  group: string
  role: string
}

const RolePath: React.FC<RolePathProps> = (props) => {
  const { group, role } = props
  return (
    <StyledBreadcrumb style={{ margin: '10px 0' }}>
      <Breadcrumb.Item>{group}</Breadcrumb.Item>
      <Breadcrumb.Item className='active'>{role}</Breadcrumb.Item>
    </StyledBreadcrumb>
  )
}

export default RolePath