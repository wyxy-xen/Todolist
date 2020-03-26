import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { activity } from 'src/app/models/category.enum';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  typeCategory: activity = activity['0'];
  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  onAddCategory(value) {
     const Nom = value.Nom;
     const Type = value.Type;
     const Photo = 'aaaahahababv';
     const category = new Category(Nom, Type, Photo);
     this.categoryService.addCategory(category);
     this.dialogRef.close({action: 1, data: this.categoryService.categories});
  }

  addPhoto() {

  }
}
