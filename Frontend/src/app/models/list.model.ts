import { Category } from './category.model';

export class List {
   Nom: string;
   Type: string;
   Category: Category;
   DateDebut: Date;
   DateFin: Date;
   isDone: boolean;
   isLate: boolean;
   percent: number;
   constructor(Nom: string, Type: string, Category: Category, DateDebut: Date,
               DateFin: Date, isDone: boolean, isLate: boolean, percent: number) {
      this.Nom = Nom;
      this.Type = Type;
      this.Category = Category;
      this.DateDebut = DateDebut;
      this.DateFin = DateFin;
      this.isDone = isDone;
      this.isLate = isLate;
      this.percent = percent;
   }
}
