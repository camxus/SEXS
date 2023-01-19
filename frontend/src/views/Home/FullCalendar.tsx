import React from 'react'
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

function FullCalendar(className) {

    return (
        <div className={`d-flex justify-content-center align-items-center m-1 ${className}`} style={{ gap: "2rem"}}>
            <Calendar
                className="rounded"
                value={[new Date(), new Date(Date.now() + ( 3600 * 1000 * 24 * 10))]}
            />
        </div>
    )
}

export default FullCalendar