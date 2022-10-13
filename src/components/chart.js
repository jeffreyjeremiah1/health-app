
import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      series: [this.props.series],

      options: {
        plotOptions: {
          pie:{
            donut: {
              labels:{
                show: true,
                name: {
                  show: true,
                  color: 'white',
                },
                value: {
                  show: true,
                  color: 'white'
                },
                total: {
                  show: true,
                  fontsize: 30,
                  color: '#ffffff',
                } 
              }
            }
          },
          dataLabels : {
            enabled: true
          }
          },
        labels: ["Calories", "Fats", "Protein"],
        fill: {
          colors: ['#F44336', '#E91E63', '#9C27B0'],
        },
        title: {
           text: "Food Contents",
           style: {
            color: '#fff'
           }
        }
      },

    }
  }

  render() {

    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.props.series} chartoptions={this.state.plotOptions} type="donut" width="380"/>
      </div>
    );
  }
}

export default Donut;
