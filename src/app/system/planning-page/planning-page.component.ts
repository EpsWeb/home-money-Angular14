import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {WfmEvent} from '../shared/models/event.model';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill?: Bill;
  categories: Category[] = [];
  events: WfmEvent[] = [];

  s1?: Subscription

  constructor(private billService: BillService,
              private categoriesService: CategoryService,
              private eventsService: EventsService
  ) {
  }

  ngOnInit(): void {
    this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    )
      .subscribe((data: [Bill, Category[], WfmEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1]
        this.events = data[2]

        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    this.s1?.unsubscribe()
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome')
    return catEvents.reduce((total, event) => {
      total += event.amount
      return total
    }, 0)
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity
    return percent > 100 ? 100 : percent
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%'
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat)
    return percent < 60 ? 'success' : percent >= 100 ? 'danger': 'warning'
  }



}
