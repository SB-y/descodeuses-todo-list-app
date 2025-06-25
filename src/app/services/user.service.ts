import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/userlist.model';

@Injectable({
  providedIn: 'root'
})




export class UserService {

  private apiURL = "api/users";

  constructor(private http: HttpClient) { }


  getUsers() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<User[]>(this.apiURL);
  }
}


 // addUser(item: User) {
 //   return this.http.post<User>(this.apiURL, item);
 // }

 // getUser(id: number) {
 //   return this.http.get<User>(this.apiURL + "/" + id);
 // }

  //updateUser(item: User) {
  //  return this.http.put<User>(this.apiURL + "/" + item.id, item);
  //}

  //deleteUser(id: number) {
  //  return this.http.delete(this.apiURL + '/' + id);
  //}
  




