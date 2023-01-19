export async function calcCycleData(user) {

    try {

      const getAverage = (values) => {
        let sum = 0
        for (let i = 0; i < values.length; i++) {
          sum += values[i]
        }
        return  sum / values.length
      }

      const getDiffDates = (dates) => {
        const diffTime = Math.abs(+new Date(dates[1]) - +new Date(dates[0]))
        // diffDays
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }

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


      const driftsData = (cycles) => {
        let drifts = []
        for (let i = 0; i < cycles.length; i++) {
          if (cycles[i + 1]) {
            try {
              const cycleLength = getDiffDates([cycles[i].luteal_phase_daterange[1], cycles[i].menstruation_daterange[0]])
              
              const estimatedDate = addRemoveDays(cycles[i].luteal_phase_daterange[0], cycleLength, "+")
              const _drift = getDiffDates([cycles[i + 1].menstruation_daterange[1], estimatedDate])
              drifts = [...drifts, _drift]
            } catch (e) {
            }
          }
        }
        return {avg: getAverage(drifts), max: Math.max(...drifts)}
      }


      const cycleLengthData = () => {
        let cycleLengths = []
        user.cycle.cycles.forEach(cycle => {
          // get difference of dates between the end of luteal phase and beginning of menstruation
          cycleLengths = [...cycleLengths, getDiffDates([cycle.luteal_phase_daterange[1], cycle.menstruation_daterange[0]])]
        })
        return {avg: getAverage(cycleLengths), max: Math.max(...cycleLengths)}
      }

      const mensturationLengthData = () => {
        let cycleLengths = []
        user.cycle.cycles.forEach(cycle => {
          // get difference of dates between menstruation end and menstruation beginning
          cycleLengths = [...cycleLengths, getDiffDates([cycle.menstruation_daterange[1], cycle.menstruation_daterange[0]])]
        })
        return {avg: getAverage(cycleLengths), max: Math.max(...cycleLengths)}
      }

      const lutealPhaseLengthData = () => {
        let cycleLengths = []
        user.cycle.cycles.forEach(cycle => {
          // get difference of dates between end and beginning of luteal phase
          cycleLengths = [...cycleLengths, getDiffDates([cycle.luteal_phase_daterange[1], cycle.luteal_phase_daterange[0]])]
        })
        return {avg: getAverage(cycleLengths), max: Math.max(...cycleLengths)}
      }

      const estimatedNextCycleData = () => {
        const lastCycle = user.cycle.cycles.pop()
        user.cycle.cycles.push(lastCycle)
        const avgCycleLength = user.cycle.avg_cycle_length ?? cycleLengthData().avg
        const lastDay = addRemoveDays(lastCycle.luteal_phase_daterange[1], avgCycleLength - 1, "+")
        // Ovulation Date 14 days before end of cycle
        const ovulationDate = addRemoveDays(lastDay, 14, "-")
        
        const fertilityDaterange = [addRemoveDays(ovulationDate, 5, "-"), addRemoveDays(ovulationDate, 2, "+")]
        
        const lutealPhaseDaterange = [addRemoveDays(fertilityDaterange[1], 1, "+"), lastDay]
        
        return {
          luteal_phase_daterange: lutealPhaseDaterange,
          menstruation_daterange: [addRemoveDays(lastCycle.luteal_phase_daterange[0], 1, "+"), addRemoveDays(lastCycle.luteal_phase_daterange[0], user.cycle.menstruation_data.avg_menstruation_length ?? 5, "+")],
          ovulation_date: ovulationDate,
          fertility_daterange: fertilityDaterange
        }
      }

      user["cycle"] = {
        ...user.cycle,
        cycle_data: {
          ...user.cycle.cycle_data,
          avg_cycle_length: cycleLengthData().avg ?? user.cycle?.avg_cycle_length ?? 0,
          max_cycle_length: cycleLengthData().max ?? user.cycle?.max_cycle_length ?? 0
        },
        menstruation_data: {
          ...user.cycle.menstruation_data,
          avg_menstruation_length: mensturationLengthData().avg ?? user.menstruation_data?.avg_menstruation_length ?? 5,
          max_menstruation_length: mensturationLengthData().max ?? user.menstruation_data?.max_menstruation_length ?? 5,
          menstruation_avg_drift: driftsData(user.cycle.cycles).avg ?? user.menstruation_data?.menstruation_avg_drift,
          menstruation_max_drift: driftsData(user.cycle.cycles).max ?? user.menstruation_data?.menstruation_max_drift,
        },
        luteal_phase_data: {
          ...user.cycle.luteal_phase_data,
          max_luteal_phase_length: lutealPhaseLengthData().avg ?? user.luteal_phase_data?.max_luteal_phase_length ?? 0,
          avg_luteal_phase_length: lutealPhaseLengthData().max ?? user.luteal_phase_data?.max_luteal_phase_length ?? 0
        },
        estimated_next_cycle: {
          ...user.cycle.estimated_next_cycle,
          menstruation_daterange: estimatedNextCycleData().menstruation_daterange.map(date => +date) ?? user.estimated_next_cycle?.menstruation_daterange,
          ovulation_date: +estimatedNextCycleData().ovulation_date ?? user.estimated_next_cycle?.ovulation_date,
          luteal_phase_daterange: estimatedNextCycleData().luteal_phase_daterange.map(date => +date) ?? user.estimated_next_cycle?.luteal_phase_daterange,
          fertility_daterange: estimatedNextCycleData().fertility_daterange.map(date => +date) ?? user.estimated_next_cycle?.fertility_daterange
        }
      }

      return user
    } catch (err) {
      throw err
    }
  }