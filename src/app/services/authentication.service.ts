import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    url_authentication = 'http://localhost:8080/auth';

    login(username: string, password: string) {
        return this.http.post<any>(this.url_authentication, { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {


                  // Debugging angular-jwt library
                  // const helper = new JwtHelperService();
                  // const decodedToken = helper.decodeToken(res.token);
                  // console.log('****** JETON DECODE A la réception: ' + JSON.stringify(decodedToken));

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));


                  //   const content = localStorage.getItem('currentUser');
                  //  const content_token_parsed = helper.decodeToken(JSON.parse(content).token);
                  //   console.log('+++++++ JETON DECODE à partir du LOCAL STORAGE: ' + JSON.stringify (content_token_parsed));

                  }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        return ( localStorage.getItem('currentUser')) ? true : false;
    }

    getJwtSubjet(): string {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const helper = new JwtHelperService();
        return helper.decodeToken(JSON.parse(stored).token).sub;
      }
      return null;
    }
}
