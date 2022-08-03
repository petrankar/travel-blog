import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
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
  public username$: Subject<string> = new BehaviorSubject<string>('');
  public isLoggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    console.log('auth service constructor');
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
          this.username$.next(userDetails.userId);
          sessionStorage.setItem('sessionToken', userDetails.sessionToken);
          sessionStorage.setItem('userId', userDetails.userId);
        },
        error: (e) => {
          console.error(e);
          this.username$.next('');
          this.isLoggedIn$.next(false);
        },
        complete: () => {
          console.info('complete');
          this.isLoggedIn$.next(true);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
      });

    return result;
  }

  logout() {
    const userToken = sessionStorage.getItem('sessionToken');
    console.log('userToken: ', userToken);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-sessiontoken': <string>userToken,
      }),
    };

    const url = this.baseEndpoint + this.userLogoutPath;
    const result = this.http.get(url, options).subscribe({
      next: (res: any) => {
        console.log('next: ', res);
      },
      error: (e) => {
        console.error(e);
        if (e.error.message === 'Invalid Session Token') {
          this.removeUserFromSessionStorage();
          this.isLoggedIn$.next(false);
        }
      },
      complete: () => {
        console.log('logout complete');
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
