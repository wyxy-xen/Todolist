import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  nameCategory: string;
  typeCategory: string;
  index: number;
  constructor(private dialogRef: MatDialogRef<EditCategoryComponent>,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      this.index = data.data;
    }
  }

  ngOnInit(): void {
    const categories: Category[] = this.categoryService.getCategories();
    console.log('categories', categories);
    this.nameCategory = categories[this.index]['Nom'];
    this.typeCategory = categories[this.index]['Type'];
  }

  closeModal() {
    this.dialogRef.close();
  }

  onEditCategory(value) {
    const Nom = value.Nom;
    const Type = value.Type;
    const Photo = 'aaaahahababv';
    const category = new Category(Nom, Type, Photo);
    this.categoryService.editCategory(this.index, category);
    this.dialogRef.close({ action: 1, data: this.categoryService.categories });
  } // méthode permettant d'ajouter une catégorie à la liste de catégorie

  editPhoto() {

  }

}
