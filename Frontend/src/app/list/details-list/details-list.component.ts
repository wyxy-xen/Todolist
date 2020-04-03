import { Component, OnInit, Inject } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit {
  nomList: string;
  typeList: string;
  categoryList: string;
  dateDebutList: Date;
  dateFinList: Date;
  isLateList: string;
  percentList: number;
  list: List;

  constructor(private dialogRef: MatDialogRef<DetailsListComponent>,
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                if (data !== null) {
                  this.list = data.data;
                }
              }

  ngOnInit(): void {
    const lists: List[] = this.listService.getLists();
    const index = lists.indexOf(this.list);
    this.nomList = lists[index]['Nom'];
    this.typeList = lists[index]['Type'];
    this.categoryList = lists[index]['Category'];
    this.dateDebutList = lists[index]['DateDebut'];
    this.dateFinList = lists[index]['DateFin'];
    this.isLateList = lists[index]['IsLate'];
    this.percentList = lists[index]['Percent'];
  } // méthode permettant d'affecter des valeurs aux proprietés

  closeModal() {
    this.dialogRef.close();
  } // méthode permettant la fermeture la fenetre popup

}
