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
export class RegistryUserServiceService {

  constructor(
    private httpClient:HttpClient
  ) {}

     getUsers()
  {
    console.log("test call");
    //return this.httpClient.get<RegistryUser[]>('http://localhost:8080/giftregistry');
	return this.httpClient.get<RegistryUser>('http://localhost:8080/giftregistry/user1/please');
  }
  public addUser(user) {
    return this.httpClient.post<RegistryUser>("http://localhost:8080/giftregistry", user);
  }
}