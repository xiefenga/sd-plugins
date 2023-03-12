import dayjs from 'dayjs'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/ColumnVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

const ColumnVisits = () => {

  // const xData = ['1-1', '1-5', '1-10', '1-20', '1-25']

  // const yData = [
  //   { name: '新闻', value: [10, 22, 28, 43, 49] },
  //   { name: '评论', value: [5, 4, 3, 5, 10] },
  //   { name: '评论2', value: [5, 4, 3, 5, 10] },
  // ]

  const { data } = useRequestAssets('columnAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [nameIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['name', 'views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD')))

  const cols = [...new Set(currentMonthList.map(current => current[nameIndex]))]

  const yData = cols.map(col => {
    const value = currentMonthList
      .filter(current => current[nameIndex] === col)
      .sort((a, b) => dayjs(a[dateIndex], 'YYYY-MM-DD').diff(dayjs(b[dateIndex], 'YYYY-MM-DD')))
      .map(current => Number(current[viewsIndex]))
    return { name: col, value }
  })

  const xData = [...new Set(
    currentMonthList
      .sort((a, b) => dayjs(a[dateIndex], 'YYYY-MM-DD').diff(dayjs(b[dateIndex], 'YYYY-MM-DD')))
      .map(current => dayjs(current[dateIndex]).format('M-D'))
  )]

  return (
    <ChartWrapper x={70} y={181} w={295} h={300}>
      <BaseChart xData={xData} yData={yData} />
    </ChartWrapper>
  )
}

export default ColumnVisits