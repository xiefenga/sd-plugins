import React, { useContext } from 'react'
import { message, Spin, Tree } from 'antd'
import { useEffect, useState } from 'react'
import { AntTreeNodeProps, EventDataNode, TreeProps } from 'antd/es/tree'
import { MinusSquareOutlined, PlusSquareOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

import { Office } from '@/types'
import PluginContext from '@/context/Plugin'
import { BussinessUserResp, NormalOffice } from '@/types/api/account'
import { queryBussinessUsers, queryOfficeByOfficeId } from '@/api/account'
import './index.less'

interface DataNode {
  key: string
  code?: string
  title: string
  icon?: React.ReactNode
  isLeaf?: boolean
  disableCheckbox?: boolean
  meta?: BussinessUserResp
  children: DataNode[]
  selectable?: boolean
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

const getParentByKey = (node: DataNode, key: string): DataNode | null => {
  if (node.children.length > 0) {
    for (const child of node.children) {
      if (child.key === key) {
        return node
      } else {
        const target = getParentByKey(child, key)
        if (target) {
          return target
        }
      }
    }
  }
  return null
}

const formatIdentification = (idStr: string) => {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
  return reg.test(idStr) ? idStr.slice(0, 3) + '********' + idStr.slice(-4) : idStr
}

interface UserTreeProps {
  initKey?: string
  onChoose?: (choosed: { user: BussinessUserResp, office: Office } | null) => void
}

const UserTree: React.FC<UserTreeProps> = ({
  initKey,
  onChoose = () => { },
}) => {

  const [loading, setLoading] = useState(false)

  const [officeData, setOfficeData] = useState<DataNode[]>([])

  const [checkedKeys, setCheckedKeys] = useState<string[]>(initKey ? [initKey] : [])

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
        icon: <TeamOutlined />,
        disableCheckbox: true,
        selectable: false,
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
        // key: `${key}-${code}-${user.MC}-${user.BDNM}`,
        key: user.SFZHM,
        icon: <UserOutlined />,
        title: (
          <span>
            <span style={{ marginRight: 5 }}>{user.MC}</span>
            <span>({formatIdentification(user.SFZHM)})</span>
          </span>
        ),
        selectable: false,
        code: user.SFZHM,
        children: [],
        disableCheckbox: false,
        isLeaf: true,
        meta: user,
      }))


    target.children = offices
      .map(({ office }) => {

        const isLeaf = (office as unknown as NormalOffice).children.length === 0 || userChildren.length > 0
        return {
          key: office.id,
          code: office.code,
          title: office.name,
          children: [],
          icon: <TeamOutlined />,
          disableCheckbox: true,
          isLeaf,
          selectable: false,
        }
        // @ts-expect-error
      }).concat(userChildren)

    setOfficeData([rootOfficeData])
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, e) => {
    const { checked, node } = e
    setCheckedKeys(
      checked
        ? [node.key as string]
        : []
    )

    // console.log(checkedKeys, e)

    if (!checked) {
      return onChoose(null)
    }

    const [rootOfficeData] = officeData

    const parent = getParentByKey(rootOfficeData, (Array.isArray(checkedKeys) ? checkedKeys[0] : checkedKeys.checked[0]) as string)

    if (parent === null) {
      throw new Error('数据有误')
    }

    const { key, title } = parent

    const office = { officeId: key, office_name: title }

    const user = (node as DataNode).meta!

    onChoose({ user, office })
  }

  return (
    <Spin spinning={loading} tip='正在加载数据'>
      <div className='user-tree'>
        <Tree
          showIcon
          switcherIcon={({ expanded }: AntTreeNodeProps) => {
            return expanded ? <MinusSquareOutlined style={{ fontSize: 16, paddingTop: 4, marginRight: 5 }} /> : <PlusSquareOutlined style={{ fontSize: 16, paddingTop: 4, marginRight: 5 }} />
          }}
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