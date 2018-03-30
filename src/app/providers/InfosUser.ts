import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class InfosUser implements CanActivate {

    public id: number = 0;
    public user_connected: boolean = false;

    constructor( private router: Router ) {};
    
    canActivate(): boolean {

        if ( this.id > 0 ) {
            return true;
        } else {
            this.router.navigate(["home"]);
        }

    }
}