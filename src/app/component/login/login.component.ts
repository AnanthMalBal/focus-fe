import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthserviceService } from 'src/app/services/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  username: string = "";
  password: string = "";
  type: string = "password";


  loginForm!: FormGroup
  hasError!: boolean
  returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9-,@.&_]{3,15}$")]],
      password: ['', [Validators.required, Validators.pattern("^[a-zA-z0-9@.&_]{3,15}$")]],
    });
  }

  // convenience getter for easy access to form fields
 
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  

  loginProcess() {
    this.router.navigate(["login"])
    console.log("form", this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .subscribe((results) => {
        console.log(results)
      },
        error => {
          Swal.fire({
            text:
              "Invalid Credentials,Please check your username and password",
            // error.message,
            confirmButtonColor: 'var(--primary)',
            // background: '#efc96a',
          });
        }
      );
  }

  // ngOnDestroy() {
  //   this.unsubscribe.forEach((sb) => sb.unsubscribe());
  // }
}
