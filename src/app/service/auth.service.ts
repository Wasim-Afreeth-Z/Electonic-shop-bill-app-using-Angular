import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogedin: boolean = false

  userLoginData: { username: string, password: string }[] = [
    { username: 'super@gmail.com', password: '1234' }
  ]

  login(username: string | null, password: string | null): { username: string, password: string } | undefined {

    const loginCkeck = this.userLoginData.find((user: { username: string, password: string }) =>
      user.username === username && user.password === password
    )

    if (loginCkeck == undefined) {
      this.isLogedin = false
    } else {
      this.isLogedin = true
    }
    return loginCkeck
  }

  logOut(): void {
    this.isLogedin = false
  }

  isAuthentication(): boolean {
    return this.isLogedin
  }
}
