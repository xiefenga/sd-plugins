import React, { ReactNode } from 'react'
import './index.less'

interface SelectPanelProps {
  tip: string
  selector: ReactNode
  selected: ReactNode
}

const SelectPanel: React.FC<SelectPanelProps> = ({
  tip,
  selector,
  selected,
}) => {  

  return (
    <div className='select-panel'>
      <div className='select-box'>{selector}</div>
      <div className='select-tip'>您已选择的{tip}：</div>
      <div className='selected-data'>{selected}</div>
    </div>
  )
}

export default SelectPanel