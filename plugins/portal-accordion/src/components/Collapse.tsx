import React, { useState } from 'react'
import x from '../assets/训教管.png'
import CollapsePanel from './CollapsePanel'
import PictureCollapse from '@/components/PictureCollapse'
import type { CollapsePanelProps } from './CollapsePanel'
import {panelList} from '@/utils/config'

const Collapse = () => {

  const panelProps: CollapsePanelProps[] = panelList

  const renderPanelContent = (props: CollapsePanelProps) => {
    return (
      <CollapsePanel {...props} />
    )
  }

  return (
    <PictureCollapse
      width={642}
      height={360}
      collapseWidth={145}
      panelProps={panelProps}
      renderPanelContent={renderPanelContent}
    />
  )
}

export default Collapse