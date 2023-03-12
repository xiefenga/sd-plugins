import dayjs from 'dayjs'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/NewsVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

type ReduceMemo = [string[], number[]]

const NewsVisits = () => {
  // const xData = ['1-1', '1-5', '1-10', '1-20', '1-25']
  // const yData = [21, 132, 101, 134, 90, 230, 210]

  const { data } = useRequestAssets('newsAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD')))

  const [xData, yData] = currentMonthList.reduce<ReduceMemo>(([x, y], item) => ([[...x, dayjs(item[dateIndex], 'YYYY-MM-DD').format('M-D')], [...y, Number(item[viewsIndex])]]), [[], []])

  return (
    <ChartWrapper x={155} y={614} w={267} h={192}>
      <BaseChart xData={xData} yData={yData} />
    </ChartWrapper>
  )
}

export default NewsVisits