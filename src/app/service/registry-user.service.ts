import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class RegistryUser {
    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class RegistryUserService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getUsers() {
        return this.httpClient.get < Object > ('http://localhost:8080/giftregistry');
    }
	public userExists(username, email) {
        return this.httpClient.get < Object > ("http://localhost:8080/giftregistry/userExists/"+username+"/"+email);
    }
    public addUser(user) {
        return this.httpClient.post < RegistryUser > ("http://localhost:8080/giftregistry", user);
    }
}