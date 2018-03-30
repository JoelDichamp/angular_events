import { Category } from "./Category";

export class CityEvent {

    private id: number = 0;

    private event_name: string;
    private description: string;
    private category: Category;
    private date: Date;
    private spot: string;

    private participated: boolean = false;

    private visible_description: boolean = false;
    
    constructor( event_name: string, description: string, category: Category, date: Date, spot:string) {
        this.event_name = event_name;
        this.description = description;
        this.category = category;
        this.date = date;
        this.spot = spot;
    }

    static empty(): CityEvent{
        return new CityEvent( "", "", Category.empty(), new Date(), "");
    }

    setId( id: number ): void {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setEvent_name( event_name: string ) {
        this.event_name = event_name;
    }

    getEvent_name() {
        return this.event_name;
    }

    setDescription( description: string ) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setSpot( spot: string ) {
        this.spot = spot;
    }

    getSpot() {
        return this.spot;
    }

    setDate( date: Date ) {
        this.date = date;
    }

    getDate() {
        return this.date;
    }

    setCategory( category: Category ) {
        this.category = category;
    }

    getCategory() {
        return this.category;
    }

    getParticipated(): boolean {

        return this.participated;
    }

    setParticipated( value: boolean ) {
        this.participated = value;
    }

    getVisible_description(): boolean {

        return this.visible_description;
    }

    setVisible_description( value: boolean ) {
        this.visible_description = value;
    }

    getClassDate(): string {
        let classDate: string = "colorNotParticipated"; 

        if ( this.participated ) {
            let d: Date = new Date();
            if ( d.getTime() <= this.date.getTime() ) {
                classDate="colorEventInProgress"
            } else {
                classDate="colorPastEvent"
            }
            // console.log("curdate :" + d.getTime() + "    date evt : " + this.date.getTime());
        }

        return classDate;
    }
}

export interface CityEventLiteral {
    id: number, 
    event_name: string, 
    description: string, 
    date: string,
    spot: string,
    id_category: number
}