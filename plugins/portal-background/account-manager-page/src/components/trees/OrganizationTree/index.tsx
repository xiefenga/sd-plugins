import { useMount } from 'ahooks'
import React, { useState } from 'react'
import { message, Spin, Tree } from 'antd'
import { EventDataNode, TreeProps } from 'antd/es/tree'
import { queryOfficeByOfficeId } from '@/api/account'
import { NormalOffice, RootOffice } from '@/types/api/account'

interface DataNode {
  key: string
  code?: string
  title: string
  isLeaf?: boolean
  children: DataNode[]
  meta: RootOffice | NormalOffice | null
}

const getNodeByKey = (node: DataNode, key: string): DataNode | null => {
  if (node.key === key) {
    return node
  } else if (node.children.length > 0) {
    for (const child of node.children) {
      const target = getNodeByKey(child, key)
      if (target) {
        return target
      }
    }
  }
  return null
}

interface OrganizationTreeProps {
  checked?: string
  onChoose?: (meta: RootOffice | NormalOffice | null) => void
}

const OrganizationTree: React.FC<OrganizationTreeProps> = (props) => {

  const { onChoose = () => {}, checked } = props

  const [loading, setLoading] = useState(false)

  const [officeData, setOfficeData] = useState<DataNode[]>([])

  const [checkedKeys, setCheckedKeys] = useState<string[]>(checked ? [checked] : [])

  useMount(async () => {
    setLoading(true)
    await fetchhRootData()
    setLoading(false)
  })

  const fetchhRootData = async () => {
    try {
      const [{ office }] = await queryOfficeByOfficeId()      
      const rootOfficeData: DataNode = {
        key: office.id,
        code: office.code,
        title: office.name,
        children: [],
        meta: office,
      }
      setOfficeData([rootOfficeData])
    } catch (error) {
      message.error('获取组织数据失败, ' + error)
      console.log(error)
    }
  }

  const onLoadData = async ({ key }: EventDataNode<DataNode>) => {
    const offices = await queryOfficeByOfficeId(key as string)

    const [rootOfficeData] = officeData

    const target = getNodeByKey(rootOfficeData, key as string)

    if (target === null) {
      return
    }


    target.children = offices
      .map(({ office }) => ({
        key: office.id,
        code: office.code,
        title: office.name,
        children: [],
        meta: (office as unknown as NormalOffice),
        isLeaf: (office as unknown as NormalOffice).children.length === 0,
      }))

    setOfficeData([rootOfficeData])
  }

  const onCheck: TreeProps['onCheck'] = (_, { checked, node }) => {
    setCheckedKeys(
      checked
        ? [node.key as string]
        : []
    )

    onChoose(
      checked
        ? (node as unknown as DataNode).meta
        : null
    )
  }


  return (
    <Spin spinning={loading}>
      <div className='organazation-tree'>
        <Tree
          checkable
          checkStrictly
          onCheck={onCheck}
          treeData={officeData}
          loadData={onLoadData}
          checkedKeys={checkedKeys}
        />
      </div>
    </Spin>
  )
}

export default OrganizationTree