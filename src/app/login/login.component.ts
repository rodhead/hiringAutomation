import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username='';
  password='';
  invalidLogin = false;

  constructor(private router:Router,private loginService:AuthenticationService) { }

  ngOnInit() {
  }

   checkLogin(){
     this.loginService.authenticating(this.username,this.password)
    .then(result=>{
      if(result){
        this.router.navigate(['']);
      this.invalidLogin=false;
      }
      else{
        this.invalidLogin=true;
      }
    });
  }
}
