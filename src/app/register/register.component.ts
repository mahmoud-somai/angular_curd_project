import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {


  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,

    ) {

    let formControls = {
      firstname: new FormControl(),
      lastname: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    }

    this.registerForm = this.fb.group(formControls)
  }

  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get phone() { return this.registerForm.get('phone') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }



  ngOnInit(): void {
    let isLoggedIn = this.userService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/people-list']);
    }
  }

  register() {

    let data = this.registerForm.value;

    let user = new User(data.firstname,data.lastname,data.email,data.phone,data.password);
    console.log(user);


    this.userService.registerAdmin(user).subscribe(
      res=>{
        this.router.navigate(['/login']);
      },
      err=>{
        console.log(err);
      }
    )

  }


}
