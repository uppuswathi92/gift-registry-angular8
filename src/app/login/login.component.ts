import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../form-style.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  //string: username = "";
  //string: password = "";
  invalidLogin:Boolean = false;
  submitted:Boolean = false;
  registered: Boolean = false;

  constructor(private router: Router,
    private loginservice: AuthenticationService, private route: ActivatedRoute) { 
	this.route.queryParams.subscribe(params => {
        if(params['status'] === "registered"){
			this.registered = true;
		}
    });
	}

  ngOnInit() {
  }

  checkLogin() {
	  this.invalidLogin = false;
	  this.submitted = true;
	   this.loginservice.authenticate(this.username,this.password).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
    /*if (this.loginservice.authenticate(this.username, this.password)
    ) {
      //this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }*/
 

}
 handleSuccessfulResponse(response)
	{
		console.log(response);
		if(response != null){
			if(response.service === "login"){
				if(response.results === "success"){
					sessionStorage.setItem('username', this.username);
					this.router.navigate(['myevents']);
				}else{
					this.invalidLogin = true;
				}
			}
		}
	}
}