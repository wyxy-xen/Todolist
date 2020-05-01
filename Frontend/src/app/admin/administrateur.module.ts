import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [AdministrateurComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  exports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  providers: [MatDialog]
})
export class AdministrateurModule { }
