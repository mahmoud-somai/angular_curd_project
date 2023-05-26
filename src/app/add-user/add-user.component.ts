import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private userSerivce:UserService,
    private router:Router,

    ) {

    let formControls = {
      firstname: new FormControl(),
      lastname: new FormControl(),
      phone: new FormControl(),
    }

    this.addUserForm = this.fb.group(formControls)
  }

  get firstname() { return this.addUserForm.get('firstname') }
  get lastname() { return this.addUserForm.get('lastname') }
  get phone() { return this.addUserForm.get('phone') }


  ngOnInit(): void {
  }

  addUser() {
    let data = this.addUserForm.value;

    let user = new User(data.firstname,data.lastname,undefined,data.phone);
    console.log(user);

    this.userSerivce.addUser(user).subscribe(
      res=>{
        this.router.navigate(['/people-list']);
      },
      error=>{
        console.log(error);
      }
    )

  }

}
