import { Component, OnInit } from '@angular/core';
import { RegistryUserService, RegistryUser } from '../service/registry-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css', '../../form-style.css']
})
export class AddUserComponent implements OnInit {

  user: RegistryUser = new RegistryUser("","","","","","");
  userExists: Boolean = false;
  submitted: Boolean = false;
  displaySpinner: Boolean = false;
  constructor(
    private httpClientService: RegistryUserService, private router: Router
  ) { }

  ngOnInit() {

  }
	addUser(): void {
		this.submitted = true;
		this.displaySpinner = true;
		//this.httpClientService.addUser(this.user)
			//.subscribe( data => {
			  //alert("User created successfully.");
			//});
			this.httpClientService.addUser(this.user).subscribe(
     response =>this.handleSuccessfulResponse(response));

	}
	handleSuccessfulResponse(response)
	{
		if(response === "user exists"){
			this.userExists = true;
		}else{
			this.displaySpinner = false;
			this.router.navigate(["login"], { queryParams: { status: "registered" } });
		}
	}
}
