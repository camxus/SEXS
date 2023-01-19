import React, { useEffect, useState } from 'react'
import { Camera, Database } from 'react-feather'
import { Button } from 'reactstrap'
import InfiniteCalendar, {
    Calendar,
    withRange,
    withMultipleDates
  } from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'; // only needs to be imported once



function PeriodSelect(props) {
    const { cycleData, setCycleData } = props
    const [selectedDateRange, setSelectedDateRange] = useState([])
    const [menstruationDateRanges, setMenstruationDateRanges] = useState([])

    const addRemoveDays = (input, amount, operator) => {
        let date = new Date(input)
        // input
        // "2022-24-09"
        // output
        // ISO STRING
        switch (operator) {
          case '+':
            date.setDate(date.getDate() + amount)
            break
          case '-':
            date.setDate(date.getDate() - amount)
            break
          default:
            throw new Error('INVALID_OPERATOR')
        }
        return date
    }

    const addRemoveDates = (date, operator) => {
        let dates = []
        if (operator === "add") {
            dates = [date]
            console.log(cycleData.menstruation_data?.menstruation_length)
            for (let i = 0; i < (cycleData.menstruation_data?.menstruation_length - 1) ?? 4; i++) {
                dates = [...dates, addRemoveDays(dates[i], 1, "+")]  
            }
            let _dates = [...dates]
            setMenstruationDateRanges(dateRanges => {
                const _dateRanges = [...dateRanges]
                if (dateRanges.length === 0) {
                    return ( [...dateRanges, [+_dates[0], +_dates.pop()]])
                } else if (+addRemoveDays(dateRanges[0]?.[0], 13, "-") > +_dates[0]) {
                    return ( [...dateRanges, [+_dates[0], +_dates.pop()]] )
                } else if ([..._dateRanges.pop()][0] < +addRemoveDays(+_dates[0], 13, "-")) {
                    return ( [...dateRanges, [+_dates[0], +_dates.pop()]] )
                } else {
                    console.log(dateRanges)
                    return dateRanges
                }
            })
        } else {
            dates = selectedDateRange.filter(_date => +_date !== +date)
            setMenstruationDateRanges(dateRanges => {
                console.log("removed")
                return dateRanges.filter(dateRange => !(dateRange[0] < +date && +date < dateRange[1])) ?? []
            })
        }
        console.log(dates)
        return dates
    }

    const handleSelectDate = (date: Date) => {
        let dates = null
        if (!selectedDateRange.find(_date => +_date === +date)) {
            dates = addRemoveDates(date, "add")
            console.log(dates)
            setSelectedDateRange(selectedDateRange => [...selectedDateRange, ...dates])
        } else {
            dates = addRemoveDates(date, "remove")
            setSelectedDateRange(selectedDateRange => dates)
        }
    }

    const getCycleData = (menstruationDaterange: any[], cycleLength: number) => {
        const lastDay = addRemoveDays(menstruationDaterange[0], cycleLength - 1, "+")
        // Ovulation Date 14 days before end of cycle
        const ovulationDate = addRemoveDays(lastDay, 14, "-")

        const fertilityDaterange = [+addRemoveDays(ovulationDate, 5, "-"), +addRemoveDays(ovulationDate, 2, "+")]

        const lutealPhaseDaterange = [+addRemoveDays(fertilityDaterange[1], 1, "+"), +lastDay]
        
        return {
            menstruation_daterange: menstruationDaterange,
            ovulation_date: ovulationDate,
            luteal_phase_daterange: lutealPhaseDaterange,
            fertility_daterange: fertilityDaterange
        }
    }

    useEffect(() => {
        setCycleData(cycleData => ({
            ...cycleData,
            cycles: menstruationDateRanges?.map(menstruation_daterange => 
                getCycleData(menstruation_daterange, cycleData.cycle_data?.looged_cycle_length ?? 5)
            )
        }))
    }, [menstruationDateRanges])

    const sortCycles = (a, b, object, index) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if (index) {
          return +new Date(b[object][index]) - +new Date(a[object][index])
        } else {
          return +new Date(b[object]) - +new Date(a[object])
        }
      }
  
    useEffect(() => {
        setMenstruationDateRanges(menstruationDateRanges => {
            return menstruationDateRanges.sort((a, b) => sortCycles(a, b, undefined, 0))
        })
    }, [menstruationDateRanges])

    return (
        <div className="d-flex h-100 w-100 flex-column">
            <h1 className="h-100 d-flex justify-content-center align-items-center mb-2">When was your last period?</h1>
            <div className="w-100 h-100 d-flex align-items-center my-5" style={{justifyContent: "center"}} onClick={() => {}}>
                <InfiniteCalendar
                    Component={withMultipleDates(Calendar)}
                    // Component={withRange(Calendar)}
                    selected={selectedDateRange ?? []}
                    onSelect={(date) => handleSelectDate(date)}
                    locale={{
                        headerFormat: 'MMM Do',
                    }}
                    max={+new Date()}
                    maxDate={+new Date()}
                />
            </div>
            <Button color="primary" onClick={() => props.nextStep()}>Next</Button>
        </div>
    )
}

export default PeriodSelect