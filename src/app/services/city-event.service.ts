import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityEventLiteral } from '../models/CityEvent';
import { Observable } from 'rxjs/Observable';
import { CategoryLiteral } from '../models/Category';

interface CityEventjson {
    success: boolean,
    cityEvents: CityEventLiteral[]
}

interface Categoryjson {
    success: boolean,
    categories: CategoryLiteral[]
}

@Injectable()
export class CityEventService {

    private service_url: string = "http://localhost/Exercices/APIS/CityEvents2/";

    constructor( private http: HttpClient ) {}

    getAllCityEvents(): Observable<CityEventjson> {
        return this.http.get( this.service_url + "cityEvents" ) as Observable<CityEventjson>;
    }

    getAllCityEventsByIdCategory( id_category ): Observable<CityEventjson> {
        return this.http.get( this.service_url + "cityEvent/category/" + id_category ) as Observable<CityEventjson>;
    }

    getAllCategories() : Observable<Categoryjson> {
        return this.http.get( this.service_url + "categories" ) as  Observable<Categoryjson>;
    }
}
