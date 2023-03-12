import dayjs from 'dayjs'
import React from 'react'
import { useRequestAssets } from '@/hooks'
import ChartWrapper from '@/components/ChartWrapper'
import BaseChart from '@/components/base-charts/ForumPostVisits'
import { getAssetsColumnIndex, isCurrentMonth } from '@/utils'

const ForumVisits: React.FC = () => {

  const { data } = useRequestAssets('postAssetsId')

  if (data == null) {
    return null
  }

  const [colums, list] = data

  const [topicIndex, viewsIndex, dateIndex] = getAssetsColumnIndex(colums, ['topic', 'views', 'date'])

  const currentMonthList = list.filter(d => isCurrentMonth(dayjs(d[dateIndex], 'YYYY-MM-DD'))).slice(0, 10)

  const [xData, yData] = currentMonthList.reduce<[string[], number[]]>((memo, current) => {
    memo[0].push(current[topicIndex])
    memo[1].push(Number(current[viewsIndex]))
    return memo
  }, [[], []])

  return (
    <ChartWrapper x={1441} y={602} w={295} h={272}>
      <BaseChart xData={xData} yData={yData} />
    </ChartWrapper>
  )
}

export default ForumVisits