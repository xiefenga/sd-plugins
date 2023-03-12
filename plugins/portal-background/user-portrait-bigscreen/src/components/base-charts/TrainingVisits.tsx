import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useState } from 'react'
import FullSizeChart from '../FullSizeChart'

import { OPTION_COLORS } from '@/utils/constants'

echarts.use([BarChart, CanvasRenderer])

interface ChartProps {
  xData: string[]
  yData: { name: string, data: number[] }[]
}

const DEFAULT_OPTION: EChartsOption = {
  tooltip: {},
  color: OPTION_COLORS,
  grid: {
    top: 20,
    bottom: 20,
    right: 10,
  },
  xAxis: {
    axisTick: {
      show: false,
    },
    data: [],
  },
  yAxis: {
    axisLabel: {
      color: '#fff',
      fontFamily: 'PingFang SC',
    },
    splitLine: {
      lineStyle: {
        color: '#505d97',
        type: 'dashed',
      },
    },
  },
  dataZoom: {
    type: 'inside',
  },
  series: [],
}

const TrainingVisits: React.FC<ChartProps> = (props) => {

  const { xData, yData } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    setChartOption({
      xAxis: {
        data: xData,
      },
      series: yData.map(item => ({ type: 'bar', ...item })),
    })
  }, [xData, yData])

  return (
    <FullSizeChart echarts={echarts} option={chartOption}/>
  )
}

export default TrainingVisits