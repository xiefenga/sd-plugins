import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useState } from 'react'
import { BarChart, PictorialBarChart } from 'echarts/charts'
import FullSizeChart from '../FullSizeChart'

echarts.use([BarChart, PictorialBarChart, CanvasRenderer])

const { LinearGradient } = echarts.graphic

const DEFAULT_OPTION: EChartsOption = {
  tooltip: {},
  animation: false,
  grid: {
    bottom: 40,
    right: 10,
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      lineHeight: 32,
    },
  },
  yAxis: {
    show: false,
  },
  dataZoom: {
    type: 'inside',
  },
  series: [],
}

const createCylinderBar = (yData: number[]): EChartsOption['series'] => {

  const series: EChartsOption['series'] = [
    {
      type: 'pictorialBar',
      symbol: 'circle',
      symbolSize: 17,
      symbolOffset: [0, -40],
      symbolPosition: 'end',
      itemStyle: {
        color: 'transparent',
        borderColor: '#6776A4',
        borderWidth: 20,
        opacity: 0.7,
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#34DCFF',
        // formatter
      },
      data: yData,
    },
    {
      type: 'pictorialBar',
      symbol: 'circle',
      symbolSize: 13,
      symbolOffset: [0, -28],
      symbolPosition: 'end',
      itemStyle: {
        color: '#6776A4',
        opacity: 0.7,
      },
      data: yData,
    },
    // 上部椭圆
    {
      type: 'pictorialBar',
      symbolSize: [29, 12],
      symbolOffset: [0, -6],
      symbolPosition: 'end',
      z: 5,
      color: '#5DECFF',
      data: yData,
    },
    // 下部椭圆
    {
      type: 'pictorialBar',
      symbolSize: [29, 12],
      symbolOffset: [0, 7],
      z: 3,
      itemStyle: {
        color: '#5EBFE9',
        opacity: 0.5,
      },
      data: yData,
    },
    // 柱形
    {
      type: 'bar',
      barWidth: 29,
      barGap: '10%',
      z: 4,
      itemStyle: {
        color: new LinearGradient(0, 0, 0, 1.08, [
          { offset: 0, color: '#5EBFE9' },
          { offset: 1, color: '#5EBFE900' },
        ]),
        opacity: 0.7,
      },
      data: yData,
    },
  ]

  return series
}

interface ChartProps {
  xData: string[]
  yData: number[]
}

const RankVisits: React.FC<ChartProps> = (props) => {

  const { xData, yData } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    setChartOption({
      xAxis: {
        data: xData,
      },
      series: createCylinderBar(yData),
    })
  }, [xData, yData])

  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default RankVisits