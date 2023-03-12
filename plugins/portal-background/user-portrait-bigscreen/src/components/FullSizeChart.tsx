import React from 'react'
import { EChartsReactProps } from 'echarts-for-react'
import ReactEChartsCore from 'echarts-for-react/lib/core'

type FullSizeChartProps = Omit<EChartsReactProps, 'style'>

const FullSizeChart: React.FC<FullSizeChartProps> = (reactEChartsCore) => {
  return (
    <ReactEChartsCore 
      {...reactEChartsCore} 
      style={{ width: '100%', height: '100%' }} 
    />
  )
}

export default FullSizeChart