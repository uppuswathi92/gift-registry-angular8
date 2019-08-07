import { Component, OnInit } from '@angular/core';
import { RegistryUserServiceService, RegistryUser } from '../service/registry-user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: RegistryUser = new RegistryUser("","","","","","");
  userExists: Boolean = false;
  submitted: Boolean = false;
  constructor(
    private httpClientService: RegistryUserServiceService
  ) { }

  ngOnInit() {

  }
	addUser(): void {
		this.submitted = true;
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
		}
	}
}
