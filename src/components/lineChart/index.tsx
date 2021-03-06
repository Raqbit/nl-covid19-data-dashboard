import React, { FunctionComponent } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import months from 'data/months.js';
import formatNumber from 'utils/formatNumber';

type LineChartProps = {
  data: Record<string, unknown>;
  signaalwaarde?: number;
};

const LineChart: FunctionComponent<LineChartProps> = ({
  data,
  signaalwaarde,
}) => {
  const formatDate = (value: number) => {
    const dateObj = new Date(value * 1000);
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
  };

  const options = {
    chart: {
      alignTicks: true,
      animation: true,
      backgroundColor: 'transparent',
      borderColor: '#000',
      borderRadius: 0,
      borderWidth: 0,
      className: 'undefined',
      colorCount: 10,
      defaultSeriesType: 'line',
      displayErrors: true,
      margin: [null],
      height: 175,
    },
    xAxis: {
      lineColor: '#C4C4C4',
      gridLineColor: '#ca005d',
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Verloop van tijd',
      },
      title: {
        text: null,
      },
      categories: Object.keys(data),
      labels: {
        align: 'right',
        rotation: '0',
        formatter: function () {
          if (this.isFirst || this.isLast) {
            const valueDate = new Date(this.value * 1000);
            return `${valueDate.getDate()} ${months[valueDate.getMonth()]}`;
          }
        },
      },
    },
    tooltip: {
      backgroundColor: '#FFF',
      borderColor: '#01689B',
      borderRadius: 0,
      formatter: function () {
        return `${formatDate(this.x)}: ${formatNumber(this.y)}`;
      },
    },
    credits: false,
    yAxis: {
      lineColor: '#C4C4C4',
      gridLineColor: '#C4C4C4',
      title: {
        text: null,
      },
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017',
      },
      plotLines: [],
    },
    title: {
      text: null,
    },
    series: [
      {
        data: Object.values(data),
        name: '',
        showInLegend: false,
        lineColor: '#3391CC',
        marker: {
          enabled: false,
        },
      },
    ],
  };

  if (signaalwaarde) {
    options.yAxis.plotLines.push({
      value: signaalwaarde,
      dashStyle: 'dash',
      width: 1,
      color: '#4f5458',
    });
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
