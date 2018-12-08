import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  constructor(private router: Router) { }

  login(username: String, password: String): void {
    // 'ezrsZmcEtqhntr'
    if (username === 'admin' && password === '1234') {
      this.isLoggedIn = true;
    } else {
      alert('Invalid Login Credentials. Please try again.');
    }
    this.router.navigate(['../library/item-list']);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['../../login']);
  }

}
