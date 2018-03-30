import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ]
})
export class UserComponent implements OnInit {

    private form_user: User = User.empty();
    private user: User = User.empty();
    private error: string = "";

    @Output() public onConnectionOk: EventEmitter<boolean> = new EventEmitter();
    
    constructor( private userService: UserService, private connectionUser: ConnectionService ) { }

    ngOnInit() {
        this.user = this.connectionUser.getUser();
    }

    checkConnection(): void {
        this.connectionUser.checkConnection( this.form_user ).subscribe(
            (data) => {
                this.user = data;
                this.connectionState( true );
            },
            (error) => {
                this.error = error;
                this.connectionState( false );
            }

        );
    }

    connectionState( connection: boolean ) {
        this.onConnectionOk.emit( connection );
    }

}
