import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col
} from 'reactstrap'
import Chart from 'react-apexcharts'

const sampledata = {
  support_tracker: {
    title: 'Support Tracker',
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    totalTicket: 163,
    newTicket: 29,
    openTicket: 63,
    responseTime: 1
  },
  avg_sessions: {
    sessions: 2700,
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    growth: '+5.2%',
    goal: 100000,
    users: 100000,
    retention: 90,
    duration: 1
  },
  revenue_report: {
    years: ['2020', '2019', '2018'],
    price: '25,852',
    budget: '56,800'
  },
  goal_overview: {
    completed: '786,617',
    inProgress: '13,561'
  },
  revenue: {
    thisMonth: '86,589',
    lastMonth: '73,683'
  },
  product_orders: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    chart_info: { finished: 23043, pending: 14658, rejected: 4758 }
  },
  sessions_device: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    chart_info: [
      {
        icon: 'Monitor',
        name: 'Desktop',
        iconColor: 'text-primary',
        usage: 58.6,
        upDown: 2
      },
      {
        icon: 'Tablet',
        name: 'Mobile',
        iconColor: 'text-warning',
        usage: 34.9,
        upDown: 8
      },
      {
        icon: 'Tablet',
        name: 'Tablet',
        iconColor: 'text-danger',
        usage: 6.5,
        upDown: -5
      }
    ]
  },
  customers: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    listData: [
      {
        icon: 'Circle',
        iconColor: 'text-primary',
        text: 'New',
        result: 690
      },
      {
        icon: 'Circle',
        iconColor: 'text-warning',
        text: 'Returning',
        result: 258
      },
      {
        icon: 'Circle',
        iconColor: 'text-danger',
        text: 'Referrals',
        result: 149
      }
    ]
  }
}

const SupportTracker = props => {
  const [data, setData] = useState({
    title: 'Support Tracker',
      last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
      totalTicket: 163,
      newTicket: 29,
      openTicket: 63,
      responseTime: 1
  }
)

  // useEffect(() => {
  //   axios.get('/card/card-analytics/support-tracker').then(res => setData(res.data))
  // }, [])

  const options = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: '#fff',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: 'Montserrat',
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              fontFamily: 'Montserrat',
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [props.danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [props.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['Completed Tickets']
    },
    series = [83]

  return data !== null ? (
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle tag='h4'>{data.title}</CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu right>
            {data.last_days.map(item => (
              <DropdownItem className='w-100' key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='2' className='d-flex flex-column flex-wrap text-center'>
            <h1 className='font-large-2 font-weight-bolder mt-2 mb-0'>{data.totalTicket}</h1>
            <CardText>Tickets</CardText>
          </Col>
          <Col sm='10' className='d-flex justify-content-center'>
            <Chart options={options} series={series} type='radialBar' height={270} id='support-tracker-card' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div className='text-center'>
            <CardText className='mb-50'>New Tickets</CardText>
            <span className='font-large-1 font-weight-bold'>{data.newTicket}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Open Tickets</CardText>
            <span className='font-large-1 font-weight-bold'>{data.openTicket}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Response Time</CardText>
            <span className='font-large-1 font-weight-bold'>{data.responseTime}d</span>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : null
}
export default SupportTracker
