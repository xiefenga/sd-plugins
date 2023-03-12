import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useState } from 'react'
import FullSizeChart from '@/components/FullSizeChart'

echarts.use([RadarChart, CanvasRenderer])

const { LinearGradient } = echarts.graphic

const DEFAULT_OPTION: EChartsOption = {
  tooltip: {
    triggerOn: 'click',
  },
  grid: {
    top: '-50%',
    left: 20,
    right: 20,
    bottom: 30,
  },
  radar: {
    axisName: {
      show: false,
    },
    indicator: [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
    ],
    center: ['50%', '20%'],
    radius: '150%',
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },
  series: [
    {
      type: 'radar',
      lineStyle: {
        color: '#fff',
        width: 1,
      },
      emphasis: {
        areaStyle: {
          opacity: 0,
        },
      },
      silent: true,
      data: [
        
      ],
    }],
}

interface ChartProps {
  value: string[]
}

const ForumSectionVisits: React.FC<ChartProps> = ({ value }) => {

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  useEffect(() => {
    setChartOption({
      series: [
        {
          data: [
            {
              value: [0, 0, 0, 100, 99, 100, 0, 0],
              name: value[4],
              symbolSize: 1,
              areaStyle: {
                color: new LinearGradient(0, 0, 0, 1.1, [
                  { offset: 0, color: '#50ACD3' },
                  { offset: 1, color: '#50ACD300' },
                ]),
              },
              label: {
                show: true,
                position: [-5, -10],
                formatter: function (point) {
                  if (point.value === 99) {
                    return '—— ' + point.name
                  } else {
                    return ''
                  }
                },
              },
            },
            {
              value: [0, 0, 0, 80, 79, 80, 0, 0],
              name: value[3],
              symbolSize: 1,
              areaStyle: {
                color: '#50ACD3',
              },
              label: {
                show: true,
                position: [-55, -10],
                formatter: function (point) {
                  if (point.value === 79) {
                    return point.name + ' ——'
                  } else {
                    return ''
                  }
                },
              },
            },
            {
              value: [0, 0, 0, 60, 59, 60, 0, 0],
              name: value[2],
              symbol: 'circle',
              symbolSize: 1,
              areaStyle: {
                color: '#50ACD3',
              },
              label: {
                show: true,
                position: [-5, -10],
                formatter: function (point) {
                  if (point.value === 59) {
                    return '—— ' + point.name
                  } else {
                    return ''
                  }
                },
              },
            },
            {
              value: [0, 0, 0, 39, 40, 40, 0, 0],
              name: value[1],
              symbol: 'circle',
              symbolSize: 1,
              areaStyle: {
                color: '#50ACD3',
              },
              label: {
                show: true,
                position: [-55, -10],
                formatter: function (point) {
                  if (point.value === 39) {
                    return point.name + ' ——'
                  } else {
                    return ''
                  }
                },
              },
            },
            {
              value: [0, 0, 0, 20, 20, 19, 0, 0],
              name: value[0],
              symbolSize: 1,
              areaStyle: {
                color: '#50ACD3',
              },
              label: {
                show: true,
                position: [-5, -10],
                formatter(point) {
                  if (point.value === 19) {
                    return '—— ' + point.name
                  } else {
                    return ''
                  }
                },
              },
            },
          ],
        },
      ],
    })
  }, [value])


  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default ForumSectionVisits