import React, { useContext } from 'react'
import { message, Spin, Tree } from 'antd'
import { useEffect, useState } from 'react'
import { EventDataNode, TreeProps } from 'antd/es/tree'

import PluginContext from '@/context/Plugin'
import { BussinessUserResp, NormalOffice} from '@/types/api/account'
import { queryBussinessUsers, queryOfficeByOfficeId } from '@/api/account'
import './index.less'

interface DataNode {
  key: string
  code?: string
  title: string
  isLeaf?: boolean
  disableCheckbox?: boolean
  meta?: BussinessUserResp
  children: DataNode[]
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

interface UserTreeProps {
  onChoose?: (user: BussinessUserResp | null) => void
}

const UserTree: React.FC<UserTreeProps> = ({
  onChoose = () => { },
}) => {

  const [loading, setLoading] = useState(false)

  const [officeData, setOfficeData] = useState<DataNode[]>([])

  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  const [userList, setUserList] = useState<BussinessUserResp[]>([])

  const { assetId } = useContext(PluginContext)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchUserData = async () => {
    try {
      const list = await queryBussinessUsers(assetId)
      setUserList(list)
    } catch (error) {
      message.error('获取用户数据失败, ' + error)
      console.log(error)
    }
  }

  const fetchRootData = async () => {
    try {
      const [{ office }] = await queryOfficeByOfficeId()
      const rootOfficeData: DataNode = {
        key: office.id,
        code: office.code,
        title: office.name,
        children: [],
        disableCheckbox: true,
      }
      setOfficeData([rootOfficeData])
    } catch (error) {
      message.error('获取组织数据失败, ' + error)
      console.log(error)
    }
  }

  const fetchData = async () => {

    setLoading(true)

    await Promise.all([
      fetchRootData(),
      fetchUserData(),
    ])

    setLoading(false)
  }

  const onLoadData = async ({ key, code }: EventDataNode<DataNode>) => {
    const offices = await queryOfficeByOfficeId(key as string)

    const [rootOfficeData] = officeData

    const target = getNodeByKey(rootOfficeData, key as string)

    if (target === null) {
      return
    }

    const userChildren = userList
      .filter(user => user.BDNM === code)
      .map(user => ({
        key: `${key}-${code}-${user.MC}-${user.BDNM}`,
        title: user.MC,
        code: user.SFZHM,
        children: [],
        disableCheckbox: false,
        isLeaf: true,
        meta: user,
      }))


    target.children = offices
      .map(({ office }) => ({
        key: office.id,
        code: office.code,
        title: office.name,
        children: [],
        disableCheckbox: true,
        isLeaf: (office as unknown as NormalOffice).children.length === 0 && // 无子组织
                (userList.filter(user => user.BDNM === office.code).length === 0), //无用户
      })).concat(userChildren)

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
        ? (node as DataNode).meta ?? null
        : null
    )
  }

  return (
    <Spin spinning={loading} tip='正在加载数据'>
      <div className='user-tree'>
        <Tree
          showLine
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

export default UserTree