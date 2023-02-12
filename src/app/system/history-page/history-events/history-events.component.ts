import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {WfmEvent} from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: WfmEvent[] = [];

  constructor() { }

  searchValue = ''
  searchPlaceHolder = 'Summary'
  searchField = 'amount'

  ngOnInit(): void {
    this.events.forEach(e => {
      e.catName = this.categories.find(c => c.id === e.category)?.name;
    })
  }

  getEventClass(event: WfmEvent): any {
    return {
      'label': true,
      'label-success': event.type === 'income',
      'label-danger': event.type === 'outcome'
    }
  }

  changeCriteria(field: 'amount' | 'date' | 'category' | 'type'): void {
    const namesMap = {
      amount: 'Summary',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    }
    this.searchPlaceHolder = namesMap[field]
    this.searchField = field
  }

}
