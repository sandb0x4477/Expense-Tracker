import { Component, OnInit, ViewChild } from '@angular/core';

import { UIChart } from 'primeng/primeng';
import { ChartService } from '../shared/chart.service';
import { IMonthlyData } from '../shared/montlydata.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @ViewChild('barChart') barChart: UIChart;

  data: any;
  options: any;
  todayDate = new Date();
  monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  monthlyData: IMonthlyData[];
  monthlyBudget = [];

  constructor(private chartData: ChartService) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Expenses',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: []
        }
      ]
    };

    this.options = {
      title: {
        display: true,
        text: 'Monthly Spending',
        fontSize: 18
      },
      // responsive: true,
      // maintainAspectRatio: true,
      scales: {
        xAxes: [{
          stacked: false
        }],
        yAxes: [{
          ticks: {
            min: 0
          },
          stacked: false
        }]
      }

    };
  }

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    this.chartData.getChartData()
      .subscribe(res => {
        this.monthlyData = res;
        this.fillData(this.monthlyData);
      });
  }
  fillData(data: IMonthlyData[]) {
    // console.log('data', data);
    let tempArr0 = [];
    let tempArr1 = [];
    data = data.slice(-6);

    for (let i = 0; i < 6; i++) {
      // console.log(data[i]);

      if (data[i]) {
        tempArr0.push(parseFloat(data[i].sum));
        tempArr1.push(this.monthsArr[data[i].month - 1]);
      } else {
        tempArr0.push(0);
        tempArr1.push('');
      }
    }
    // console.log('tempArr1', tempArr1);
    tempArr0 = tempArr0.slice(-6);
    tempArr1 = tempArr1.slice(-6);

    this.data.datasets[0].data = [...tempArr0];
    this.data.labels = [...tempArr1];
    this.barChart.reinit();
  }
}








/*
  firstDayMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 5, 1);
    return firstDay.toISOString();
  }

  lastDayMonth(date) {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.toISOString();
  }
 */
