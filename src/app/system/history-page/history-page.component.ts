import { Component, OnInit } from '@angular/core';
import {combineLatest} from 'rxjs';
import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {WfmEvent} from '../shared/models/event.model';

import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  constructor(private categoriesService: CategoryService, private eventsService: EventsService) {
  }

  categories: Category[] = [];
  events: WfmEvent[] = [];
  filteredEvents: WfmEvent[] = []
  chartData: any[] = [];
  isLoaded = false;
  isFilterVisible = false;

  ngOnInit() {
    combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    )
      .subscribe((data: [Category[], WfmEvent[]]) => {
        this.categories = data[0]
        this.events = data[1]

        this.setOriginalEvents()
        this.calculateChartData();

        this.isLoaded = true;
      })
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat: Category) => {
      const catEvents = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome')
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    })
  }

  openFilter() {
    this.toggleFilterVisibility(true)
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false)
    this.setOriginalEvents()
    this.calculateChartData()
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false)
    this.setOriginalEvents()

    const startPeriod = moment().startOf(filterData.period).startOf('d')
    const endPeriod = moment().endOf(filterData.period).endOf('d')

    this.filteredEvents = this.filteredEvents
      .filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter(e => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter(e => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
        return momentDate.isBetween(startPeriod, endPeriod)
      })
    this.calculateChartData()
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice()
  }

}




























