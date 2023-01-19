import { useEffect, useState } from 'react'
import axios from 'axios'
import { Users } from 'react-feather'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = ({ kFormatter }) => {
  const [data, setData] = useState(
    {
      series: [
        {
          name: 'Subscribers',
          data: [28, 40, 36, 52, 38, 60, 55]
        }
      ],
      analyticsData: {
        subscribers: 92600
      }
    
    }
  )

  // useEffect(() => {
  //   axios.get('/card/card-statistics/subscribers').then(res => setData(res.data))
  // }, [])

  return data !== null ? (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color='primary'
      stats={kFormatter(data.analyticsData.subscribers)}
      statTitle='Subscribers Gained'
      series={data.series}
      type='area'
    />
  ) : null
}

export default SubscribersGained
