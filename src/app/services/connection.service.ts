import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CanActivate, Router } from '@angular/router';

interface Connexionjson {
    success: boolean,
    id: number;
}

@Injectable()
export class ConnectionService implements CanActivate{

    private service_url: string = "http://localhost/Exercices/APIS/CityEvents2/";
    private user: User = User.empty();

    constructor( private http: HttpClient, private router: Router) { }

    public checkConnection( user: User ): Observable<User> {

        const obs: Observable<User> = Observable.create(
            ( observer: Observer<User> ) => {
                this.http.post<Connexionjson>( this.service_url + "user", user )
                .subscribe(
                    (data) => {
                        if ( data.success ) {
                            this.user = new User( data.id, "", "" );

                            //stockage en sessionstorage
                            sessionStorage.setItem( "user", JSON.stringify(this.user) );
                            observer.next( this.user );
                        } else {
                            observer.error("Utilisateur et/ou mot de passe incorrects");
                        }
                        
                    },
                    (error) =>{
                        observer.error("Erreur lors de la récupération du user");
                    }
                ) 
            }  
        );

        return obs;
    } 
      
    getUser() {
        const storageUser = sessionStorage.getItem("user");
        if ( storageUser && !this.user.getId() ) {
            const jsonuser : { id: number } = JSON.parse( storageUser );
            this.user = new User(jsonuser.id, "", "");
        } 

        return this.user;
    }

    canActivate(): boolean {

        if ( this.user.getId() > 0 ) {
            return true;
        } else {
            this.router.navigate(["home"]);
        }

    }

}
