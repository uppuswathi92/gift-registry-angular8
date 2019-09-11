import { Component, OnInit } from '@angular/core';
import { RegistryUserService, RegistryUser } from '../service/registry-user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css', '../../form-style.css']
})
export class AddUserComponent implements OnInit {
    user: RegistryUser = new RegistryUser("", "", "", "", "", "");
    userExists: Boolean = false;
    submitted: Boolean = false;
    displaySpinner: Boolean = false;
    constructor(
        private userService: RegistryUserService, private router: Router
    ) {}
    ngOnInit() {}

    //invoked on click of register
    addUser(registrationform): void {
        this.submitted = true;
        if (!registrationform.invalid) {
            this.displaySpinner = true;
            this.userExist();
        }
    }

    //invokes register service
    register(): void {
        this.userService.addUser(this.user).subscribe(
            response => this.handleSuccessfulResponse(response));
    }

    //checks if user already exists with the username or email entered
    userExist(): void {
        this.userService.userExists(this.user.username, this.user.email).subscribe(
            response => this.handleSuccessfulResponse(response));
    }

    //handles response from http service
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service == "userExists") {
                if (!response.results) {
                    this.register();
                } else {
                    this.displaySpinner = false;
                    this.userExists = true;
                }
            } else if (response.service === "register") {
                this.displaySpinner = false;
                this.router.navigate(["login"], {
                    queryParams: {
                        status: "registered"
                    }
                });
            }
        }
    }
}