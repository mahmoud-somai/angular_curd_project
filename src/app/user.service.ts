import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUsersUrl="http://localhost:8800/api/data/offre";
  private deleteUserUrl="http://localhost:8800/api/data/offre/";
  private addUserUrl="http://localhost:8800/api/data/offre"
  private getOneUserUrl = "http://localhost:8800/api/data/offre/"
  private updateUserUrl = "http://localhost:8800/api/data/offre"
  private loginUserUrl = "http://localhost:8800/api/data/offre/login"
  private registerUserUrl = "http://localhost:8800/api/data/offre/register"


  constructor(private http:HttpClient) { }
  getAllUsers(){
    let data=this.http.get<any>(this.getAllUsersUrl);
    return data;
  }
  deleteUser(id:String){
    return this.http.delete<any>(this.deleteUserUrl+id)
  }
  addUser(user: User) {
    return this.http.post<any>(this.addUserUrl, user);
  }

  getOneUser(id: String) {
    return this.http.get<any>(this.getOneUserUrl + id)
  }


  updateUser(id:String,user:User){
    return this.http.put<any>(`${this.updateUserUrl}/${id}`, user);
  }

  registerAdmin(user : User){
    return this.http.post<any>(this.registerUserUrl, user);
  }

  loginAdmin(user:User){
    return this.http.post<any>(this.loginUserUrl, user);
  }

  isLoggedIn(){
    let token = localStorage.getItem("My Token");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }




}
