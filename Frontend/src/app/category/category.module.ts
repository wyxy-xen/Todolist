import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DetailsCategoryComponent } from './details-category/details-category.component';

@NgModule({
  declarations: [CategoryComponent, AddCategoryComponent, DeleteCategoryComponent, EditCategoryComponent, DetailsCategoryComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  providers: [MatDialog],
  entryComponents: [AddCategoryComponent]
})
export class CategoryModule { }
