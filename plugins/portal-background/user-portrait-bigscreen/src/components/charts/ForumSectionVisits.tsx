import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/ForumSectionVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'
import dayjs from 'dayjs'


const ForumSectionVisits = () => {

  const { data } = useRequestAssets('sectionAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [sectionIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['section', 'views', 'date'])

  const currentMonthList = list
    .filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM')))
    .slice(0, 5)
    .sort((a, b) => Number(b[viewsIndex]) - Number(a[viewsIndex]))

  const value = currentMonthList.map(current => current[sectionIndex])

  return (
    <ChartWrapper x={1523} y={301} w={226} h={202}>
      <BaseChart value={value} />
    </ChartWrapper >
  )
}

export default ForumSectionVisits