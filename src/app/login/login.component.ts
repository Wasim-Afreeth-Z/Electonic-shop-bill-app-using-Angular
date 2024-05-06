import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommanService } from '../service/comman.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // !form validation
  loginForm!: FormGroup
  formBuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  isSubmitted: boolean = false
  isSubmit(): void {
    this.isSubmitted = true
  }


  // !password hide / show icon
  visible: boolean = true
  changetype: boolean = true
  eye: boolean = false
  eyehide: string = 'fa-regular fa-eye-slash'

  viewPassword(): void {
    this.visible = !this.visible
    this.changetype = !this.changetype
    this.eye = !this.eye
    this.eyehide = !this.eye ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'
  }

  //! api request send for login
  commonService = inject(CommanService)
  loginservice = inject(AuthService)
  snackBar = inject(MatSnackBar)
  route = inject(Router)

  login(): void {
    const request = {
      "userName": this.loginForm.value.userName,
      "password": this.loginForm.value.password
    }

    this.commonService.login({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        localStorage.setItem('token', response.token)
        localStorage.setItem('userId', response.userId)
        // console.log(response);
        this.route.navigateByUrl('productlist')
        localStorage.removeItem('cart')
      }
    }
    )
    const loginDataSend = this.loginservice.login(request.userName, request.password)

    if (loginDataSend == undefined) {
      this.snackBar.open('User Not Founded', 'Failed', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    } else {
      this.snackBar.open('Successfully Login', 'Success', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }
  }

  loginAndsubmit() {
    this.login()
    this.isSubmit()
  }
}
