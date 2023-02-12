import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: Category[] = []
  isLoaded = false

  constructor(private categoriesService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories
        this.isLoaded = true
      })
  }

  categoryWasEdited(category: Category): void {
    const idx = this.categories.findIndex(c => c.id === category.id)
    this.categories[idx] = category
  }

  newCategoryAdded(category: Category): void {
    this.categories.push(category)
  }

}
