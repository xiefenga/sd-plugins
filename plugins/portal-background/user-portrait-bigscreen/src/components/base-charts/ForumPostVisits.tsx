import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import React, { useEffect, useState } from 'react'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PictorialBarChart } from 'echarts/charts'
import FullSizeChart from '@/components/FullSizeChart'

echarts.use([LineChart, PictorialBarChart, CanvasRenderer])

const { LinearGradient } = echarts.graphic

const DEFAULT_OPTION: EChartsOption = {
  tooltip: {
    formatter: '{a}: {c}',
  },
  grid: {
    top: 30,
    left: 20,
    right: 20,
    bottom: 30,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    data: [],
  },
  yAxis: {
    type: 'value',
    show: false,
    max(value) {
      return value.max + 20
    },
  },
  series: [
    {
      name: '访问量',
      type: 'pictorialBar',
      symbol: 'path://d=\'M150 0 L75 200 L225 200 Z\'',
      barWidth: '95%',
      itemStyle: {
        color: new LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#9ee5f1' },
          { offset: 0.5, color: '#9ee5f1' },
          { offset: 0.5, color: '#5EBFE9' },
          { offset: 1, color: '#78cff5' },
        ]),
      },
      data: [],
    },
    {
      type: 'line',
      name: '访问量',
      data: [],
    },
  ],
}

interface ChartProps {
  xData: string[]
  yData: number[]
}

const ForumVisits: React.FC<ChartProps> = (props) => {

  const { xData, yData } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    setChartOption({
      xAxis: { data: xData },
      series: [
        { data: yData },
        { data: yData },
      ],
    })
  }, [xData, yData])


  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default ForumVisits