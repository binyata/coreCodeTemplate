import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { NavBar } from 'Components/NavBar/NavBar'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export class Home extends React.Component {
    render() {
        const options = {
            title: {
              text: 'My chart'
            },
            series: [{
              data: [1, 2, 3]
            }]
        }
        return (
            <div>
                <NavBar />
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            </div>
        )
    }
}