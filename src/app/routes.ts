import { Routes } from "@angular/router";
import { EventsComponent } from "./events/events.component";
import { HomeComponent } from "./home/home.component";
import { Category } from "./models/Category";
import { ConnectionService } from "./services/connection.service";

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
       path: "events", //route - url
       canActivate: [ConnectionService],
       component: EventsComponent //component appelé dans la route
    },
    {
        path: "events/:id_category", //route - url
        canActivate: [ConnectionService],
        component: EventsComponent //component appelé dans la route
     },
    {
        path: "**",
        redirectTo: "home"
    }
]