import dayjs from 'dayjs'
import { Coordinate } from '@/types'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/TroopVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

const TroopVisits = () => {
  
  const { data } = useRequestAssets('troopAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [posIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['pos', 'views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD')))

  const value = currentMonthList.map(current => ({
    name: '',
    value: Number(current[viewsIndex]),
    pos: JSON.parse(current[posIndex]) as Coordinate, 
  }))

  return (
    <ChartWrapper x={374} y={128} w={319} h={235}>
      <BaseChart data={value} />
    </ChartWrapper>
  )
}

export default TroopVisits