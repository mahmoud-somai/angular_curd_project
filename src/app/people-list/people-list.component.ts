import { Component ,OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  userslist!:any[];
  constructor(private userService:UserService) {}



  ngOnInit():void{
    this.userService.getAllUsers().subscribe(
      result=>{
        this.userslist=result;
      },error=>{
        console.log(error);

      }
    )
  }

  delete(person: { _id: String; }) {
    let index = this.userslist.indexOf(person);
    this.userslist.splice(index, 1);

    this.userService.deleteUser(person._id).subscribe(
      res=>{
        console.log(res);
        ;
      },
      err =>{
        console.log(err);
      }
    )
  }


}
