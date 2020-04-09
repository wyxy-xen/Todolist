import { Category } from './category.model';

export class List {
   Nom: string;
   Type: string;
   Category: string;
   DateDebut: Date;
   DateFin: Date;
   DateFinExact: Date;
   IsDone: boolean;
   IsLate: string;
   Percent: number;
   constructor(Nom: string, Type: string, Category: string, DateDebut: Date,
               DateFin: Date, DateFinExact: Date, IsDone: boolean, IsLate: string, Percent: number) {
      this.Nom = Nom;
      this.Type = Type;
      this.Category = Category;
      this.DateDebut = DateDebut;
      this.DateFin = DateFin;
      this.DateFinExact = DateFinExact;
      this.IsDone = IsDone;
      this.IsLate = IsLate;
      this.Percent = Percent;
   }
}
