import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string='hr.Ganit'
  name:string;
  constructor(private loginService:AuthenticationService) { }

  ngOnInit() {
    this.name=this.loginService.getUserName();
  }

}
