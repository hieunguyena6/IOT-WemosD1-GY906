import Axios from 'axios';
import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {
    try {
      setInterval(async () => {
        const res = await Axios.get('http://127.0.0.1:5000/logs/?limit=15');
        this.setState({
          data: res.data.rows
        })
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const data_temp = this.state.data;
    const list_time = data_temp?.map(i => moment(i.created_at).format("HH:mm:ss.SS"));
    const list_ob = data_temp?.map(i => i.temperature_ob);
    const list_ab = data_temp?.map(i => i.temperature_ab);

    const data = {
      labels: list_time,
      datasets: [
        {
          label: 'Môi trường',
          data: list_ab,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Vật thể',
          data: list_ob,
          fill: false,
          backgroundColor: 'rgb(3, 78, 252)',
          borderColor: 'rgba(3, 78, 252, 0.5)',
        },
      ],
    }

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    }

    return <>
      <div className='header'>
        <h1 className='title'>Line Chart</h1>
        <div className='links'>
          <a
            className='btn btn-gh'
            href='https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Line.js'
          >
          </a>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  }
}

export default LineChart