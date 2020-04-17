
export class Category {
    Nom: string;
    Type: string;
    Photo: string;
    imageURL: string;
    constructor(Nom: string, Type: string, Photo?: string, imageURL?: string) {
        this.Nom = Nom;
        this.Type = Type;
        this.Photo = Photo;
        this.imageURL = imageURL;
    }
} // modèle pur cération de l'objet catégorie
