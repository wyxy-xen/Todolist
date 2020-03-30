import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  index: number;
  constructor(private dialogRef: MatDialogRef<DeleteCategoryComponent>,
              private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                if (data !== null) {
                      this.index = data.data;
                 }
              }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  onDeleteCategory() {
    this.categoryService.deleteCategory(this.index);
    this.dialogRef.close({action: 1, data: this.categoryService.categories});
  }

}
