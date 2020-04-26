export class List {
   Nom: string;
   Type: string;
   DateDebut: Date;
   DateFin: Date;
   DateFinExact: Date;
   IsDone: boolean;
   IsLate: string;
   Percent: number;
   idCategory: any;
   idUser: any;
   constructor(Nom: string, Type: string, DateDebut: Date,
               DateFin: Date, DateFinExact: Date, IsDone: boolean, IsLate: string, Percent: number, idCategory: any, idUser: any) {
      this.Nom = Nom;
      this.Type = Type;
      this.DateDebut = DateDebut;
      this.DateFin = DateFin;
      this.DateFinExact = DateFinExact;
      this.IsDone = IsDone;
      this.IsLate = IsLate;
      this.Percent = Percent;
      this.idCategory = idCategory;
      this.idUser = idUser;
   }
}
