import React, { PropsWithChildren } from 'react'
import RcDrawer, { DrawerProps as RcDrawerProps } from 'rc-drawer'
import motion from './motion'
import './index.less'

type DrawerProps = Omit<RcDrawerProps, 'maskMotion' | 'motion'>

const Drawer: React.FC<PropsWithChildren<DrawerProps>> = (props) => <RcDrawer {...props} {...motion} />

export default Drawer