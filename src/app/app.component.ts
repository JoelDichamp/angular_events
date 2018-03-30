import { Component } from "@angular/core";
import { Category, CategoryLiteral } from "./models/Category";
import { CityEventService } from "./services/city-event.service";
import { CategoriesG } from "./providers/CategoriesG";
import { ConnectionService } from "./services/connection.service";
import { User } from "./models/User";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CityEventService ]
})

export class AppComponent {

    public categories: Category[] = [];
    private user: User = User.empty();
    private user_connected: boolean = false;

    constructor( private cityEventService: CityEventService, 
                 private connectionUser: ConnectionService,
                 private categoriesG: CategoriesG ) {}

    ngOnInit(): void {
        this.user = this.connectionUser.getUser();
        if ( this.user.getId() ) {
            this.user_connected = true;
        }

        this.cityEventService.getAllCategories().subscribe(
            (data) => {
                if ( data.success ) { 
                    this.populateCategories( data.categories );
                    this.categoriesG.categories = this.categories;
                }
            },
            (error) => {
                console.log( error );
            }
        );
    }

    populateCategories( categories: CategoryLiteral[] ) {
        for ( let category_json of categories ) {
            const category: Category = new Category( category_json.id, category_json.category_name );

            this.categories.push( category );
        }
    }

    connectionOk( connection: boolean ) {
        this.user_connected = connection;
    }

    
}
