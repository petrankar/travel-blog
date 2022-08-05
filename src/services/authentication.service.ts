import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly baseEndpoint = 'https://frontend-2376.instashop.ae/api/';
  private readonly userLoginPath = 'users/login';
  private readonly userLogoutPath = 'users/logout';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public isLoggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const userToken = sessionStorage.getItem('sessionToken');
    if (userToken) this.isLoggedIn$.next(true);
  }

  login(user: User) {
    const url = this.baseEndpoint + this.userLoginPath;
    const userParam = JSON.stringify(user);
    const result = this.http
      .post<User>(url, userParam, this.httpOptions)
      .subscribe({
        next: (userDetails: any) => {
          sessionStorage.setItem('sessionToken', userDetails.sessionToken);
          sessionStorage.setItem('userId', userDetails.userId);
        },
        error: (e) => {
          console.error(e);
          this.isLoggedIn$.next(false);
        },
        complete: () => {
          this.isLoggedIn$.next(true);
          setTimeout(() => {
            this.router.navigate(['/administrator']);
          }, 4000);
        },
      });

    return result;
  }

  logout() {
    const userToken = sessionStorage.getItem('sessionToken');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-sessiontoken': <string>userToken,
      }),
    };

    const url = this.baseEndpoint + this.userLogoutPath;
    const result = this.http.get(url, options).subscribe({
      next: (res: any) => {},
      error: (e) => {
        console.error(e);
        if (e.error.message === 'Invalid Session Token') {
          this.removeUserFromSessionStorage();
          this.isLoggedIn$.next(false);
        }
      },
      complete: () => {
        this.removeUserFromSessionStorage();
        this.isLoggedIn$.next(false);
      },
    });
  }

  removeUserFromSessionStorage(): void {
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('userId');
  }
}
