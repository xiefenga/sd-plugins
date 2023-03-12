import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useState } from 'react'
import FullSizeChart from '@/components/FullSizeChart'

echarts.use([RadarChart, CanvasRenderer])

const DEFAULT_OPTION: EChartsOption = {
  tooltip: {},
  radar: {
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    indicator: [{}],
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [],
          name: '当月典型应用和工具访问量',
        },
      ],
    },
  ],
}

interface ChartProps {
  indicator: string[]
  value: number[]
}


const AppVisits: React.FC<ChartProps> = (props) => {

  const { indicator, value } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    if(indicator.length && value.length) {
      setChartOption({
        radar: {
          indicator: indicator.map(item => ({ name: item })),
        },
        series: [
          { data: [{ value, name: '当月典型应用和工具访问量' }] },
        ],
      })
    }
  }, [indicator, value])


  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default AppVisits