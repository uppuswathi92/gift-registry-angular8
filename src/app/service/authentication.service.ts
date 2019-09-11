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
export class AuthenticationService {

    constructor(
        private httpClient: HttpClient
    ) {}

    public authenticate(username, password) {
        return this.httpClient.get < Object > ('http://localhost:8080/giftregistry/' + username + "/" + password);
    }

    isUserLoggedIn() {
        let user = localStorage.getItem('username');
        return !(user === null)
    }

    logOut() {
        localStorage.removeItem('username')
    }

}