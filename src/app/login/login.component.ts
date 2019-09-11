import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../form-style.css']
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";
	displaySpinner:Boolean = false;
    invalidLogin: Boolean = false;
    submitted: Boolean = false;
    registered: Boolean = false;

    constructor(private router: Router,
        private loginservice: AuthenticationService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params['status'] === "registered") {
                this.registered = true;
            }
        });
    }

    ngOnInit() {}
	
	//authenticates user
    checkLogin() {
        this.invalidLogin = false;
        this.submitted = true;
		if(this.username && this.password){
			this.displaySpinner = true;
			this.loginservice.authenticate(this.username, this.password).subscribe(
				response => this.handleSuccessfulResponse(response),
			);
		}
    }
	
	//handles response from http service
    handleSuccessfulResponse(response) {
        console.log(response);
        if (response != null) {
            if (response.service === "login") {
				this.displaySpinner = false;
                if (response.results != "failure") {
                    sessionStorage.setItem('username', response.results);
					localStorage.setItem('username', response.results);
                    this.router.navigate(['myevents']);
                } else {
                    this.invalidLogin = true;
                }
            }
        }
    }
}