import React from 'react'
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

interface IRadialBar {
    percentage?,
    startAngle?,
    endAngle?,
    height?: number,
    value?,
    title?
}

function RadialBar({percentage, value, startAngle, endAngle, height, title}: IRadialBar) {
    const options: ApexOptions = {
        series: [percentage ?? 75],
        chart: {
            height: height ?? 200,
            type: "radialBar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
        radialBar: {
            startAngle: startAngle ?? -135,
            endAngle: endAngle ?? 225,
            hollow: {
                margin: 0,
                size: "70%",
                background: "#fff",
                image: undefined,
                position: "front",
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 0,
                    blur: 10,
                    opacity: 0.1
                }
            },
            track: {
                background: "#fff",
                strokeWidth: "1%",
                margin: 8, // margin is in pixels
                dropShadow: {
                    enabled: false,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                }
            },

            dataLabels: {
                show: true,
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#000",
                    fontSize: "10px",
                    fontWeight: "200"
                },
                value: {
                    formatter: function(val) {
                        console.log(value)
                        return value ?? parseInt(val.toString(), 10).toString();
                    },
                    color: "#111",
                    fontSize: "20px",
                    show: true
                }
            }
        }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0,
                gradientToColors: ["green", "red", "blue"],
                // inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 17, 40, 100],
                colorStops: [ 
                    [
                      {
                        offset: 0,
                        color: 'green',
                        opacity: 1
                      },
                      {
                        offset: 17,
                        color: 'green',
                        opacity: 50
                      },
                      {
                        offset: 40,
                        color: 'red',
                        opacity: 1
                      },
                      {
                        offset: 100,
                        color: 'lightblue',
                        opacity: 1
                      }
                    ]
                ]
            }
        },
        stroke: {
            lineCap: "round"
        },
        labels: [title ?? "Percent"]
    };
    console.log(options)
    return (
        <Chart {...{...options, options, ...options.chart}}/>
    )
}

export default RadialBar