import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useState } from 'react'
import FullSizeChart from '@/components/FullSizeChart'

echarts.use([LineChart, CanvasRenderer])

const { LinearGradient } = echarts.graphic

const DEFAULT_OPTION: EChartsOption = {
  dataZoom: {
    type: 'inside',
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a}: {c}',
  },
  grid: {
    top: 20,
    bottom: 10,
    left: 20,
    right: 20,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
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
  series: [
    {
      name: '访问量',
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#A8D8F9',
      },
      areaStyle: {
        color: new LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#5EBFE9'},
          { offset: 1, color: '#5EBFE900'},
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
}

interface ChartProps {
  xData: string[]
  yData: number[]
}

const NewsVisits: React.FC<ChartProps> = (props) => {

  const { xData, yData } = props

  const [chartOtion, setChartOtion] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    setChartOtion({
      xAxis: {
        data: xData,
      },
      series: [
        { data: yData },
      ],
    })
  }, [xData, yData])


  return (
    <FullSizeChart echarts={echarts} option={chartOtion} />
  )
}

export default NewsVisits