import { role } from './user.enum';

export class User {
   Nom: string;
   Prenom: string;
   Email: string;
   Login: string;
   MPasse: string;
   Role: role;
   constructor(Nom: string, Prenom: string, Email: string, Login: string, MPasse: string, Role: role) {
      this.Nom = Nom;
      this.Prenom = Prenom;
      this.Email = Email;
      this.Login = Login;
      this.MPasse = MPasse;
      this.Role = Role;
   }
}
