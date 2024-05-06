import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, MatSnackBarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  // !sidebar mobile view
  // display: string = 'hidden'
  menuIcon: string = "fa fa-bars"
  menuValue: boolean = true;

  openSidebar() {
    this.menuValue = !this.menuValue
    // this.display = !this.menuValue ? 'block' : 'hidden'
    this.menuIcon = !this.menuValue ? "fa fa-close" : "fa fa-bars";
  }

  // logout
  route = inject(Router)
  loginservice = inject(AuthService)
  snackBar = inject(MatSnackBar)

  logOut() {
    this.loginservice.logOut()
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.route.navigateByUrl('')
    this.snackBar.open('Successfully Logout', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}
