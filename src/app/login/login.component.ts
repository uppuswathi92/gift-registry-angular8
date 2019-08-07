import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  //string: username = "";
  //string: password = "";
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
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
		if(response){
			sessionStorage.setItem('username', this.username);
			this.router.navigate(['myevents']);
		}
	}
}