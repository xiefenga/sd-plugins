import dayjs from 'dayjs'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/TrainingVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

const TrainingVisits = () => {

  // const xData = ['1-1', '1-5', '1-10', '1-20', '1-25']

  // const yData = [
  //   { name: 'A业务', data: [10, 22, 28, 43, 49] },
  //   { name: 'B业务', data: [22, 28, 40, 22, 21] },
  //   { name: 'C业务', data: [14, 43, 49, 12, 28] },
  // ]

  const { data } = useRequestAssets('trainingAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [nameIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['name', 'views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD')))

  const cols = [...new Set(currentMonthList.map(current => current[nameIndex]))]
  
  const yData = cols.map(col => {
    const data = currentMonthList
      .filter(current => current[nameIndex] === col)
      .sort((a, b) => dayjs(a[dateIndex], 'YYYY-MM-DD').diff(dayjs(b[dateIndex], 'YYYY-MM-DD')))
      .map(current => Number(current[viewsIndex]))
    return { name: col, data }
  })

  const xData = [...new Set(
    currentMonthList
      .sort((a, b) => dayjs(a[dateIndex], 'YYYY-MM-DD').diff(dayjs(b[dateIndex], 'YYYY-MM-DD')))
      .map(current => dayjs(current[dateIndex]).format('M-D'))
  )]

  return (
    <ChartWrapper x={1055} y={670} w={309} h={183}>
      <BaseChart xData={xData} yData={yData} />
    </ChartWrapper>
  )
}

export default TrainingVisits