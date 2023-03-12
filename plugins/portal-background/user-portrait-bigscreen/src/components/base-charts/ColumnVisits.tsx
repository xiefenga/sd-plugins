import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import React, { useEffect, useMemo, useState } from 'react'
import FullSizeChart from '@/components/FullSizeChart'

echarts.use([BarChart, CanvasRenderer])

const { LinearGradient, extendShape, registerShape } = echarts.graphic

const CubeLeft = extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y]
    const c1 = [shape.x - 20, shape.y - 4]
    const c2 = [xAxisPoint[0] - 20, xAxisPoint[1] - 4]
    const c3 = [xAxisPoint[0], xAxisPoint[1]]
    ctx.moveTo(c0[0], c0[1])!.lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  },
})

const CubeRight = extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x - 5, shape.y]
    const c2 = [xAxisPoint[0] - 5, xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] - 4]
    const c4 = [shape.x + 10, shape.y - 4]
    ctx.moveTo(c1[0], c1[1])?.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  },
})

const CubeTop = extendShape({
  shape: { x: 0, y: 0 },
  buildPath(ctx, shape) {
    // 逆时针 角 y 负数向上  X 负数向左
    const c1 = [shape.x - 5, shape.y]
    const c2 = [shape.x + 10, shape.y - 4]
    const c3 = [shape.x - 5, shape.y - 8]
    const c4 = [shape.x - 20, shape.y - 4]
    ctx.moveTo(c1[0], c1[1])?.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  },
})

registerShape('CubeLeft', CubeLeft)
registerShape('CubeRight', CubeRight)
registerShape('CubeTop', CubeTop)

const color = new LinearGradient(0, 0, 0, 1.1, [
  {
    offset: 0,
    color: '#BAF5FF',
  }, {
    offset: 1,
    color: '#BAF5FF00',
  },
])


const DEFAULT_OPTION: EChartsOption = {
  tooltip: {
    formatter: '{a}: {c}',
  },
  dataZoom: {
    type: 'inside',
  },
  grid: {
    top: 30,
    bottom: 30,
    right: 20,
  },
  xAxis: {
    data: [],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    show: false,
  },
  series: [],
}

interface ChartProsp {
  xData: string[]
  yData: { name: string, value: number[] }[]
}

const ColumnVisits: React.FC<ChartProsp> = (props) => {

  const { xData, yData } = props

  const [chartOption, setChartOption] = useState(() => DEFAULT_OPTION)

  const max = useMemo(() => Math.max(...yData.map(({ value }) => value).reduce((memo, item) => memo.map((val, index) => val + item[index]), [])), [yData])
  const maxY = Math.ceil((max + 10) / 10) * 10

  const series = useMemo(() => {
    return yData.map((y, index) => {
      return {
        type: 'custom',
        name: y.name,
        renderItem(params, api) {

          const coordY = yData.filter((_, i) => i < index)
            .map(({ value }) => value)
            .reduce((memo, item) => memo + item[params.dataIndex], 0)

          const coordValue = [api.value(0), api.value(1) as number + coordY]

          const location = api.coord(coordValue)

          const [x, y] = [location[0], location[1]]

          const [xValue, yValue] = [api.value(0), api.value(1)]

          const xAxisPoint = api.coord([api.value(0), 0 + coordY])

          const shape = { api, xValue, yValue, x, y, xAxisPoint }

          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape,
                style: { fill: color },
              },
              {
                type: 'CubeRight',
                shape,
                style: { fill: color },
              },
              {
                type: 'CubeTop',
                shape,
                style: { fill: '#5DECFF' },
              },
            ],
          }
        },
        data: y.value,
      }
    }) as EChartsOption['series']
  }, [yData])

  useEffect(() => {
    setChartOption({
      series,
      yAxis: { max: maxY },
      xAxis: { data: xData },
    })
  }, [xData, maxY, series])

  return (
    <FullSizeChart echarts={echarts} option={chartOption} />
  )
}

export default ColumnVisits