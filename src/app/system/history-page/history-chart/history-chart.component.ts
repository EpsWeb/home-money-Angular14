import {Component, Input} from '@angular/core';
import {ChartConfiguration} from 'chart.js';
import {CategoryService} from '../../shared/services/category.service';
import {EventsService} from '../../shared/services/events.service';
import {Category} from '../../shared/models/category.model';
import {WfmEvent} from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  @Input() set data(value: {name: string, value: number}[]) {
    this.doughnutChartLabels = [];
    this.doughnutChartDatasets[0].data = [];
    value.forEach(e => {
      this.doughnutChartLabels.push(e.name)
      this.doughnutChartDatasets[0].data.push(e.value);
    })
  }
  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {data: [350, 450, 100]}
  ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

}
