import dayjs from 'dayjs'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/RankVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

type ReduceMemo = [string[], number[]]

const RankVisits = () => {

  // const xData = ['新闻', '新闻', '新闻', '新闻', '新闻']
  // const yData = [943, 830, 1520, 940, 1230]

  const { data } = useRequestAssets('rankAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [nameIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['name', 'views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD')))

  const [xData, yData] = currentMonthList.reduce<ReduceMemo>(([x, y], item) => ([[...x, item[nameIndex]], [...y, Number(item[viewsIndex])]]), [[], []])

  return (
    <ChartWrapper x={1167} y={136} w={295} h={241}>
      <BaseChart xData={xData} yData={yData} />
    </ChartWrapper>
  )
}

export default RankVisits