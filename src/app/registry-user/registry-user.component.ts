import { Component, OnInit } from '@angular/core';
import { RegistryUserService } from '../service/registry-user.service';


@Component({
  selector: 'app-registry-user',
  templateUrl: './registry-user.component.html',
  styleUrls: ['./registry-user.component.css']
})
export class RegistryUserComponent implements OnInit {

  users:string[];
   
  constructor(
    private registryUserService:RegistryUserService
  ) { }

  ngOnInit() {
	  this.registryUserService.getUsers().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
  }
	handleSuccessfulResponse(response)
	{
		this.users=response;
	}
}
