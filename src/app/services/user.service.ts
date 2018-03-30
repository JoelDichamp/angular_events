import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { CityEventLiteral } from '../models/CityEvent';

interface Connexionjson {
    success: boolean,
    id: number;
}

interface CityEventjson {
    success: boolean,
    cityEvents: CityEventLiteral[]
}

@Injectable()
export class UserService {

    private service_url: string = "http://localhost/Exercices/APIS/CityEvents2/";

    constructor( private http: HttpClient ) { }

    participateInEvent( id_user, id_event ): Observable<{ success: boolean }> {
        return this.http.get( this.service_url + "user_event/" + id_user + "/" + id_event) as Observable<{ success: boolean }>;
    }

    notPartipateInEvent( id_user, id_event ): Observable<{ success: boolean }> {
        return this.http.delete( this.service_url + "user_event/" + id_user + "/" + id_event ) as Observable<{ success: boolean }>;
    }

    getCityEventsUser( id_user ): Observable<CityEventjson> {
        return this.http.get( this.service_url + "user_event/" + id_user ) as Observable<CityEventjson>;
    } 
}
