import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _servive: AuthenticationService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this._servive.isLoggedIn();
  }

  getJwtSubjet(): string {
    return this._servive.getJwtSubjet();
  }

}
