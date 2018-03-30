export class Category {

    static empty(): Category {
        return new Category();
    }

    private id: number = 0;
    private category_name: string;

    constructor( id: number = 0, category_name: string = "") {
        this.id = id;
        this.category_name = category_name;
    }

    getCategory_name() {
        return this.category_name;
    }

    getId_category() {
        return this.id;
    }  
}

export interface CategoryLiteral {
    id: number, 
    category_name: string
}