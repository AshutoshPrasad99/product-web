import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

export default class VisitCountLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['Home', 'Products', 'AppDev', 'Coding Bootcamp', 'Partners', 'About Us', 'Careers', 'Contact Us']
        }
      },
      series: [
        {
          name: "",
          data: []
        }
      ]
    };
  }

  componentDidMount(){
    axios.get('http://localhost/realcoderz-in/visit-count-chart.php')
    .then(response => {
      const series = this.state.series.slice();
      series[0].name = "Number of Visit";
      series[0].data = response.data;
      this.setState({ series });
    })
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart col-lg-11">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height="300"
            />
          </div>
        </div>
      </div>
    );
  }
}