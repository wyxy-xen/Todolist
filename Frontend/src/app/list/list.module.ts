import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoneListComponent } from './done-list/done-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DoneListComponent, TodoListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  exports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule]
})
export class ListModule { }
