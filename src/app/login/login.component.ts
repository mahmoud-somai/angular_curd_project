import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup


  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    ) {

    let formControls = {
      email: new FormControl(),
      password: new FormControl()
    }

    this.loginForm = this.fb.group(formControls)
  }
  ngOnInit(): void {
    let isLoggedIn = this.userService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/people-list']);
    }

  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  login() {
    let data = this.loginForm.value;

    let user = new User(undefined,undefined,data.email,undefined,data.password);

    this.userService.loginAdmin(user).subscribe(
      res=>{
        console.log(res);
        let token=res;
        localStorage.setItem("My Token",token);
        this.router.navigate(['/people-list']);
      },
      err=>{
        console.log(err);
      }
    )

  }

}
