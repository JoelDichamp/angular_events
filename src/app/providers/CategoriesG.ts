import { Injectable } from "@angular/core";
import { Category } from "../models/Category";

@Injectable()
export class CategoriesG {

    public categories: Category[];

    getCategory( id_category: number ): Category {
        let categoryEmpty: Category = Category.empty();
        for( let c of this.categories ) {
            if ( c.getId_category() == id_category ) {
                return c;
            }
        }

        return categoryEmpty;
    }
}