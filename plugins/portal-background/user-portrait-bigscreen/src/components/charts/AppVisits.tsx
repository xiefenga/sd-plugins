import dayjs from 'dayjs'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/AppVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

const AppVisits = () => {

  const { data } = useRequestAssets('appAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [nameIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['name', 'views', 'date'])


  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM')))

  const [indicator, value] = currentMonthList.reduce<[string[], number[]]>((memo, current) => {
    memo[0].push(current[nameIndex])
    memo[1].push(Number(current[viewsIndex]))
    return memo
  }, [[], []])

  return (
    <ChartWrapper x={588} y={661} w={223} h={208}>
      <BaseChart indicator={indicator} value={value} />
    </ChartWrapper >
  )
}

export default AppVisits