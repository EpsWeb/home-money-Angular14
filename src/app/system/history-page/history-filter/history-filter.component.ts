import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Input() categories: Category[] = [];

  @Output() onFilterCancel = new EventEmitter<any>()
  @Output() onFilterApply = new EventEmitter<any>()

  timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Month'}
  ]

  selectedPeriod = 'd'
  selectedTypes: any[] = []
  selectedCategories: any[] = []

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ]

  closeFilter() {
    this.selectedTypes = []
    this.selectedCategories = []
    this.selectedPeriod = 'd'
    this.onFilterCancel.emit()
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value)
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value)
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null
    } else {
      this[field] = this[field].filter(i => i !== value)
    }
  }

}















