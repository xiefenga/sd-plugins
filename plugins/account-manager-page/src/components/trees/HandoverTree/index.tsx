import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { message, Spin, Tree, TreeProps } from 'antd'
import { queryOfficeDelCreateMember, queryUserAll } from '@/api/account'
import { OfficeDelCreateMemberChildren, UserAll_1 } from '@/types/api/account'
import './index.less'

interface HandoverTreeProps {
  onChoose?: (meta: UserAll_1 | null) => void
}

interface IdentityNode {
  key: string
  title: string
  identity: string
  meta: UserAll_1
  isLeaf: true
}

interface OfficeNode {
  key: string
  title: string
  disableCheckbox: true
  children: TreeNode[]
}

type TreeNode = OfficeNode | IdentityNode

const HandoverTree: React.FC<HandoverTreeProps> = (props) => {

  const { onChoose = () => { } } = props

  const [treeData, setTreeData] = useState<TreeNode[]>([])

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  const service = async () => {
    const [users] = await queryUserAll()
    const { children: offices } = await queryOfficeDelCreateMember()
    setTreeData(transform(offices, users))
  }

  const { loading } = useRequest(service, {
    onError(error) {
      message.error('请求数据失败, ' + error)
      console.log(error)
    },
  })

  const transform = (
    data: OfficeDelCreateMemberChildren[], 
    users: UserAll_1[]
  ): TreeNode[] => {
    return data?.map((item: any) => {
      const { id, name, children } = item
      return {
        key: id,
        title: name,
        disableCheckbox: true,
        children: transform(children, users).concat(
          users
            .filter(user => user.officeId === id)
            .map(user => {
              const { id, name, userName } = user
              return {
                key: id,
                title: name,
                identity: userName,
                meta: user,
                isLeaf: true,
              }
            })
        ),
      }
    })

  }


  const onCheck: TreeProps<TreeNode>['onCheck'] = (_, { checked, node }) => {
    setCheckedKeys(
      checked
        ? [node.key as string]
        : []
    )    
    onChoose(
      (checked && 'meta' in node) 
        ? node.meta 
        : null
    )
  }

  return (
    <Spin spinning={loading}>
      <div className='handover-tree'>
        <Tree
          showLine
          checkable
          defaultExpandAll
          autoExpandParent
          onCheck={onCheck}
          treeData={treeData}
          checkedKeys={checkedKeys}
          titleRender={(node: TreeNode) => {
            return (
              <span>
                <span>{node.title}</span>
                {'identity' in node && (
                  <span className='identity-tag'>
                    {node.identity}
                  </span>
                )}
              </span>
            )
          }}
        />
      </div>
    </Spin>
  )
}

export default HandoverTree