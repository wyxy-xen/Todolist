
export class Category {
    Nom: string;
    Type: string;
    Photo: string;
    imageURL: string;
    idUser: any;
    constructor(Nom: string, Type: string, idUser: any, Photo?: string, imageURL?: string) {
        this.Nom = Nom;
        this.Type = Type;
        this.Photo = Photo;
        this.imageURL = imageURL;
        this.idUser = idUser;
    }
} // modèle pur cération de l'objet catégorie
