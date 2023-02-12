import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(public categService: CategoryService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);

    let {name, capacity} = form.value

    const category = new Category(name, capacity)

    this.categService.addCategory(category)
      .subscribe((category: Category) => {
        console.log(category);
        form.reset();
        form.form.patchValue({capacity: 1})
        this.onCategoryAdd.emit(category)
      })
  }
}
