import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private userService:UserService,
    private router : Router,
    ) {

    let formControls = {
      firstname: new FormControl(),
      lastname: new FormControl(),
      phone: new FormControl(),
    }

    this.updateUserForm = this.fb.group(formControls)
  }

  get firstname() { return this.updateUserForm.get('firstname') }
  get lastname() { return this.updateUserForm.get('lastname') }
  get phone() { return this.updateUserForm.get('phone') }


  ngOnInit(): void {

    let idUser = this.route.snapshot.params['id'];

    this.userService.getOneUser(idUser).subscribe(
      res=>{
        let user = res;

        this.updateUserForm.patchValue({
          firstname : user.firstname,
          lastname : user.lastname ,
          phone : user.phone
        })

      },
      err=>{
        console.log(err);
      }
    )

  }

  updateUser() {
    let data = this.updateUserForm.value;
    let idUser = this.route.snapshot.params['id'];
    console.log(idUser);

    let user = new User(data.firstname,data.lastname,undefined,data.phone,undefined,idUser);

    this.userService.updateUser(idUser,user).subscribe(
      (res:any)=>{

        this.router.navigate(['/people-list']);
      },
      (err:any)=>{
        console.log(err);
      }
    )

  }

}
