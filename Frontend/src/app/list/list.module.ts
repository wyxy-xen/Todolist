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
import { DeleteListComponent } from './delete-list/delete-list.component';
import { DetailsListComponent } from './details-list/details-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { AddListComponent } from './add-list/add-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [DoneListComponent, TodoListComponent, DeleteListComponent, DetailsListComponent, EditListComponent, AddListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    Ng5SliderModule
  ],
  exports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  providers: [MatDialog]
})
export class ListModule { }
