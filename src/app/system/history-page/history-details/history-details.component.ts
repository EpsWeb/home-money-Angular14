import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoryService} from '../../shared/services/category.service';
import {mergeMap, take} from 'rxjs';
import {WfmEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {

  event: WfmEvent;
  category: Category
  isLoaded = false

  constructor(public route: ActivatedRoute, private eventsService: EventsService, private categoriesService: CategoryService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
        mergeMap((event: WfmEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category)
        }),
        take(1))
      .subscribe((category: Category) => {
        this.category = category
        this.isLoaded = true
      })
  }

}
















