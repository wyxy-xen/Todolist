import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Options, LabelType } from 'ng5-slider';
import { spot } from 'src/app/models/list.enum';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit, AfterViewInit {
  info: string;
  nomList: string;
  typeList: string;
  categoryList: string;
  dateDebutList: Date;
  dateFinList: Date;
  isLateList: string;
  percentList: number;
  list: List;
  value: number;
  options1: Options = {
    disabled: true,
    floor: 0,
    ceil: 100,
    tickStep: 25,
    showTicks: true,
    getLegend: (value: number): string => {
      if (value === 0) {
        return 'Debut';
      } else if (value === 25) {
        return '1ère échéance';
      } else if (value === 50) {
        return '2éme échéance';
      } else if (value === 75) {
        return '3éme échéance';
      } else if (value === 100) {
        return 'Fin';
      }
    }
  };
  options2: Options = {
    disabled: true,
    floor: 0,
    ceil: 100,
    tickStep: 100,
    showTicks: true,
    getLegend: (value: number): string => {
      if (value === 0) {
        return 'Debut';
      } else if (value === 100) {
        return 'Fin';
      }
    }
  };

  constructor(private dialogRef: MatDialogRef<DetailsListComponent>,
              private listService: ListService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      this.list = data.data;
      this.info = data.info;
      console.log('this.info', data, this.info);
    }
  }
 ngAfterViewInit() {
  const elems = document.getElementsByClassName('ng5-slider-pointer') as HTMLCollectionOf<HTMLElement>;
  if (elems[0] !== undefined) {
    elems[0].style.backgroundColor = '#0db9f0';
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
    this.getValueSlider();
  } // méthode permettant d'affecter des valeurs aux proprietés

  getValueSlider() {
    const toDay = new Date();
    if ((toDay <= this.dateFinList) && (toDay >= this.dateDebutList)) {
      const totalDays = this.listService.dateDiff(this.dateDebutList, this.dateFinList); // le total des jours de la tache
      const firstDays = this.listService.dateDiff(this.dateDebutList, toDay);
      // nombre de jours depuis le début de la tache jusqu'au moment présent
      this.value = (Math.floor((firstDays / totalDays) * 100));
    } else if (toDay > this.dateFinList) {
       this.value = 100;
    } else if (toDay < this.dateDebutList) {
       this.value = 0;
    }
  } // méthode permettant de donner la position de pointer de slider

  closeModal() {
    this.dialogRef.close();
  } // méthode permettant la fermeture la fenetre popup

  getTypeList() {
    if (this.typeList === spot['0']) {
      return true; // type est ponctuel
    } else {
      return false; // type est au long cours
    }
  }

}
