import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CityEventComponent } from './city-event/city-event.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './routes';
import { ResumePipe } from './pipes/resume.pipe';
import { BgDirective } from './directives/bg.directive';
import { UserComponent } from './user/user.component';
import { CategoriesG } from './providers/CategoriesG';
import { ConnectionService } from './services/connection.service';

@NgModule({
    //composants, directives, pipes
  declarations: [
    AppComponent,
    CityEventComponent,
    HomeComponent,
    EventsComponent,
    ResumePipe,
    BgDirective,
    UserComponent
  ],
  //modules
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( routes )
  ],
  //services globaux
  providers: [ ConnectionService, CategoriesG ],
  //composant sur lequel démarre l'application
  bootstrap: [AppComponent]
})
export class AppModule { }   
