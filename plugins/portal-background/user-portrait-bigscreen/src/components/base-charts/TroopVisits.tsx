import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { GeoComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, MapChart } from 'echarts/charts'
import FullSizeChart from '@/components/FullSizeChart'
import React, { useEffect, useState } from 'react'

import { Coordinate } from '@/types'
import ChinaGeoJson from '@/assets/ChinaGeo.json'

echarts.registerMap('China', ChinaGeoJson as any)
echarts.use([LineChart, MapChart, GeoComponent, CanvasRenderer])

interface ProvinceTarget {
  name: string
  target(center: Coordinate): Coordinate
}


const targetList: ProvinceTarget[] = [
  {
    name: '新疆维吾尔自治区',
    target: ([x, y]) => ([x - 15, y + 5]),
  },
  {
    name: '西藏自治区',
    target: ([x, y]) => ([x - 18, y - 3]),
  },
  {
    name: '云南省',
    target: ([x, y]) => ([x - 15, y - 10]),
  },
  {
    name: '四川省',
    target: ([x, y]) => ([x - 20, y - 10]),
  },
  {
    name: '重庆市',
    target: ([x, y]) => ([x - 5, y - 10]),
  },
  {
    name: '贵州省',
    target: ([x, y]) => ([x - 18, y - 18]),
  },
  {
    name: '台湾省',
    target: ([x, y]) => ([x + 10, y + 5]),
  },
  {
    name: '福建省',
    target: ([x, y]) => ([x + 8, y - 10]),
  },
  {
    name: '江西省',
    target: ([x, y]) => ([x + 15, y - 5]),
  },
  {
    name: '湖南省',
    target: ([x, y]) => ([x + 25, y - 10]),
  },
  {
    name: '广西壮族自治区',
    target: ([x, y]) => ([x - 5, y - 10]),
  },
  {
    name: '海南省',
    target: ([x, y]) => ([x - 2, y - 13]),
  },
  {
    name: '广东省',
    target: ([x, y]) => ([x + 5, y - 10]),
  },
  {
    name: '澳门特别行政区',
    target: ([x, y]) => ([x + 10, y - 15]),
  },
]

function _getProvinceTarget(name: string, center: Coordinate): Coordinate {
  const [x, y] = center

  return targetList
    .find(item => item.name === name)
    ?.target(center) ?? (
    [
      x > 112 ? x + 2 : x - 5,
      y > 30 ? y + 20 : y - 20,
    ]
  )
}

const DEFAULT_OPTION: EChartsOption = {
  geo: {
    map: 'China',
    // roam: true,
    zoom: 1.3,
    center: [105, 36],
    emphasis: {
      itemStyle: {
        areaColor: '#7b96d3',
      },
    },
    itemStyle: {
      areaColor: '#00D1FF3A',
      borderColor: '#00D1FF51',
      borderWidth: 1.5,
    },
  },
  // visualMap: {
  //   show: false,
  //   seriesIndex: 0,
  //   inRange: {
  //     color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#286984', '#215096'],
  //   },
  // },
  series: [
    // {
    //   geoIndex: 0,
    //   select: {
    //     disabled: true,
    //   },
    //   type: 'map',
    //   map: 'China',
    //   emphasis: {
    //     itemStyle: {
    //       areaColor: '#7b96d3',
    //     },
    //   },
    //   itemStyle: {
    //     areaColor: '#00D1FF3A',
    //     borderColor: '#00D1FF51',
    //     borderWidth: 1.5,
    //   },
    //   data: [],
    // },
    {
      type: 'lines',
      z: 3,
      coordinateSystem: 'geo',
      symbol: 'circle',
      symbolSize: [6, 0],
      color: '#17A597',
      label: {
        show: true,
        position: 'end',
        align: 'center',
      },
      lineStyle: {
        type: 'solid',
        opacity: 1,
        color: '#17A597',
        curveness: 0.1,
      },
      data: [],
    },
  ],
}

interface SingelData {
  name: string
  value: number
  pos: Coordinate
}

interface ChartProps {
  data: SingelData[]
}


const getTargetPos = (pos: Coordinate) => {
  const [x, y] = pos
  const targetX = x > 112 ? x + 15 : x - 15
  const targetY = x > 112 ? y : y + 5
  return [targetX, targetY]
}

const TroopVisits: React.FC<ChartProps> = (props) => {

  const { data } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  const lineData = data.map((item) => {
    const target = getTargetPos(item.pos)
    return {
      label: {
        // formatter: `${item.name}\n${item.value}`,
        formatter: `${item.value}`,
      },
      coords: [
        item.pos,
        target,
      ],
    }
  })

  useEffect(() => {
    setChartOption({
      series: [
        // { data: mapData },
        { data: lineData },
      ],
    })
  }, [data])


  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default TroopVisits