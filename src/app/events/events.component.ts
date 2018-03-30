import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CityEventService } from '../services/city-event.service';
import { CityEvent,CityEventLiteral } from '../models/CityEvent';

//Routes parameters
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { Category } from '../models/Category';
import { UserService } from '../services/user.service';
import { CategoriesG } from '../providers/CategoriesG';
import { ConnectionService } from '../services/connection.service';
import { User } from '../models/User';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [ CityEventService, UserService ]
})
export class EventsComponent implements OnInit /*,AfterViewInit*/ {
  
    public cityEvents: CityEvent[] = [];
    public cityEventsUser: CityEvent[] = [];
    public cityEventsForFilter: CityEvent[] = [];

    public kindEvent: string;
    public viewfilterEvent: boolean = true;
    public filter: string;

    private user: User = User.empty();

    constructor( private cityEventService: CityEventService, 
                 private userService: UserService, 
                 private connectionUser: ConnectionService,
                 private categoriesG : CategoriesG,
                 private activatedRoute: ActivatedRoute,
                 /*private renderer: Renderer2*/ ) {}


    // ngAfterViewInit() {
    //     if ( this.viewfilterEvent ) {
    //         this.renderer.listen(this.renderer.selectRootElement('#inputFilter'), 'click', () => {
    //         console.log("click");
    //         });
    //     }
    // }

    // addListenerInput() {
    //      if ( this.viewfilterEvent ) {
    //         this.renderer.listen(this.renderer.selectRootElement('#inputFilter'), 'click', () => {
    //         console.log("click");
    //         });
    //      }
    // }

    ngOnInit(): void {
        this.user = this.connectionUser.getUser();

        this.userService.getCityEventsUser( this.user.getId() ).subscribe(
            (data) => {
                if ( data.success ) {
                    this.populateCityEvents( data.cityEvents, this.cityEventsUser, true );
                    // this.addListenerInput();
                } 
                this.activateRoutes();
            },
            (error) => {
                console.log( error );
            }
        );
    }

    activateRoutes() {
        this.activatedRoute.params.subscribe(
            (data) => {
                const id: number = data.id_category;
                this.cityEvents = []; //pour effacer les evts précédemment affichés et ou filtrés par catégorie
                this.filter = "";
                if ( !id ){
                    this.getAllCityEvents();
                } else {
                    if (id == 0) {
                        this.getCityEventsUser();
                    } else {
                        this.getCityEventsByIdCategory( id );
                    } 
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }

    fillTab( tabSrc: CityEvent[], tabDest: CityEvent[]) {
        for ( let ce of tabSrc ) {
            tabDest.push(ce);
        }
    }

    getCityEventsUser() {
        this.kindEvent = "Mes évènements";
        if ( this.cityEventsUser.length == 0) {
            this.viewfilterEvent = false;
        } else {
            this.fillTab( this.cityEventsUser, this.cityEvents );
            this.cityEventsForFilter = [];
            this.fillTab( this.cityEvents, this.cityEventsForFilter );
        }
    }

    getAllCityEvents() {
        this.kindEvent = "Tous les évènements";
        this.cityEventService.getAllCityEvents().subscribe( 
            (data) => {
                if ( data.success ) {
                    this.populateCityEvents( data.cityEvents, this.cityEvents );
                }
            },
            (error) => {
                console.log( error );
            }
        );
    }

    getCityEventsByIdCategory( id: number) {
        this.kindEvent = this.categoriesG.getCategory( id ).getCategory_name();
        this.cityEventService.getAllCityEventsByIdCategory( id ).subscribe(
            (data) => {
                if ( data.success ) {
                    this.populateCityEvents( data.cityEvents, this.cityEvents );
                }
            },
            (error) => {
                console.log( error );
            }
        );
    }

    calcParticipation( eventsUser: boolean, cityEvent: CityEvent ): void {
        if ( eventsUser ) {
            cityEvent.setParticipated( true );
        } else {
            for (let ce of this.cityEventsUser ) {
                if ( ce.getId() == cityEvent.getId() ) {
                    cityEvent.setParticipated( true );
                    break;
                }
            }
        }  
    }

    populateCityEvents( cityEvents: CityEventLiteral[], tabCityEvents: CityEvent[], eventsUser: boolean = false ) {
        for ( let cityEvent_json of cityEvents ) {

            const date: Date = new Date( cityEvent_json.date );
            const category: Category = this.categoriesG.getCategory( cityEvent_json.id_category );
            const cityEvent: CityEvent = new CityEvent( 
                cityEvent_json.event_name,
                cityEvent_json.description,
                category,
                date,
                cityEvent_json.spot
            );
            cityEvent.setId( cityEvent_json.id );
            this.calcParticipation( eventsUser, cityEvent );

            tabCityEvents.push( cityEvent );
        }
        if ( !eventsUser) {
            if ( this.cityEvents.length == 0) {
                this.viewfilterEvent = false;
            } else {
                this.viewfilterEvent = true;
                this.cityEventsForFilter = [];
            this.fillTab( tabCityEvents, this.cityEventsForFilter );
            }
        }
    }

    descriptionResumeEvent( position: number ) {
        let cityEvent: CityEvent = this.cityEvents[ position ];
        if ( cityEvent.getVisible_description() ) {
            cityEvent.setVisible_description( false )
        } else {
            cityEvent.setVisible_description( true );
        }
    }

    participateInEvent( position: number ) {
        let id_user = this.user.getId();
        let cityEvent: CityEvent = this.cityEvents[ position ];
        let id_event = cityEvent.getId();
        if ( cityEvent.getParticipated() ) {
            this.notParticipated( id_user, id_event, cityEvent );
        } else {
            this.participated( id_user, id_event, cityEvent );
        }
    }

    participated( id_user: number, id_event: number, cityEvent : CityEvent ) {
        this.userService.participateInEvent( id_user, id_event ).subscribe(
            (data) => {
                if ( data.success ) {
                    cityEvent.setParticipated( true );
                    // console.log("user : " + id_user + "  id_event : " + id_event + "  participe : " + cityEvent.getParticipated() );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    notParticipated( id_user: number, id_event: number, cityEvent : CityEvent ) {
        this.userService.notPartipateInEvent( id_user, id_event ).subscribe(
            (data) => {
                if ( data.success ) {
                    cityEvent.setParticipated( false );
                    // console.log("user : " + id_user + "  id_event : " + id_event + "  participe : " + cityEvent.getParticipated() );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // @HostListener('click', ['$event'])
    // onclick(ev:Event) {
    //     console.log("click");
    // }

    // @HostListener('click') doSomething() {
    //     console.log("click");
    // }

    onFilterChanged() {
        // console.log(this.filter);
        console.log(this.cityEventsForFilter);
        this.cityEvents = [];
        for ( let ce of this.cityEventsForFilter ) {
            let filter: string = this.filter.toLowerCase();
            let event_name: string = ce.getEvent_name().toLowerCase();
            let pos = event_name.indexOf(this.filter);
			if (pos > -1) {
                this.cityEvents.push( ce );
            }
        }
    }
}
