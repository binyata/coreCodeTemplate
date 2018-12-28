import NavBar from "Components/NavBar/NavBar";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";
import { connect } from "react-redux";

class Home extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const options: any = {
            series: [{
                data: [1, 2, 3],
            }],
            title: {
              text: "Dummy Data",
            },
        };
        return (
            <div>
                <NavBar />
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {};
}

export default connect(
    mapStateToProps,
)(Home);
