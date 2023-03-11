import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { message, Spin, Tree, TreeProps } from 'antd'
import { queryAllRoles } from '@/api/account'

interface TreeData {
  key: string
  title: string
  disabled?: boolean
  isLeaf?: boolean
  meta: {
    id: string
    name: string
  }
  children?: TreeData[]
}

interface RoleTreeProps {
  checked?: string[]
  onChoose?: (meta: {
    id: string
    name: string
  }[]) => void
}

const RoleTree: React.FC<RoleTreeProps> = ({
  checked = [],
  onChoose = () => { },
}) => {

  const { loading, data = [], error } = useRequest(queryAllRoles)

  if (error) {
    message.error('获取角色数据失败, ' + error)
    console.log(error)
  }

  const treeData: TreeData[] = data.map(company => ({
    key: company.id,
    title: company.name === 'SRG.DEFAULT' ? '默认角色组' : company.name,
    disabled: true,
    meta: {
      id: company.id,
      name: company.name,
    },
    children: company.roleItemList.map(role => ({
      key: role.id,
      title: role.zhname ?? role.name,
      isLeaf: true,
      meta: {
        id: role.id,
        name: role.zhname ?? role.name,
      },
    })),
  }))

  const expandKeys = data.map(company => company.id)

  const [checkedKeys, setCheckedKeys] = useState<string[]>(checked)

  const onCheck: TreeProps['onCheck'] = (_, { checkedNodes }) => {
    setCheckedKeys(checkedNodes.map(node => node.key as string))
    onChoose(checkedNodes.map(node => (node as TreeData).meta))
  }


  return (
    <Spin spinning={loading} tip='正在加载数据'>
      <div className='organazation-tree'>
        <Tree
          checkable
          checkStrictly
          onCheck={onCheck}
          treeData={treeData}
          checkedKeys={checkedKeys}
          expandedKeys={expandKeys}
        />
      </div>
    </Spin>
  )
}

export default RoleTree