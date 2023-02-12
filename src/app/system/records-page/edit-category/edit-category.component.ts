import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory?: Category;
  message?: Message

  constructor(private categoriesService: CategoryService) { }

  ngOnInit(): void {
    this.message = new Message('success', '')
    this.onCategoryChange()
  }

  onCategoryChange(): void {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId)
  }

  onSubmit(form: NgForm): void {
    let {capacity, name} = form.value

    const category = new Category(name, capacity, +this.currentCategoryId)

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category)
        this.message!.text = 'Edited successfully'
        setTimeout(() => {
          this.message!.text = ''
        }, 5000)
        console.log(category);
      })


  }

}
