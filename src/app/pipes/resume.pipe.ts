import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: "resume"
})
export class ResumePipe implements PipeTransform {
    // transform( value: string, min_length: number = 10 ) {
        
    // if ( value.length <= min_length ) return value;

    // let formated: string = value.substr( 0, min_length ) + "...";

    // return formated;

    // }
    transform( value: string, min_word: number = 15 ) {

        let t: string[] = value.split(" ");
        
        if ( t.length <= min_word ) return value;

        let formated: string = "";
        for( let i = 0; i < min_word; i++ ) {
            formated += t[i] + " ";
        }
        formated += "...";

        return formated;
    }

}
