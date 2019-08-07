import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class RegistryUser{
  constructor(
    public username:string,
    public password:string,
    public firstName:string,
    public lastName:string,
	public email:string,
	public phoneNumber:string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient:HttpClient
  ) {}

     public authenticate(username, password) 
  {
    return this.httpClient.get<Boolean>('http://localhost:8080/giftregistry/'+username+"/"+password);
  }
  
   isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

   logOut() {
    sessionStorage.removeItem('username')
  }
}