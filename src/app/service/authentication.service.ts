import { Injectable, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  authenticated;

  constructor(private http:HttpClient) { }

   

    authenticating(username,password):Promise<boolean>{
   return new Promise((resolve,reject)=>{
    let role;
    this.getUserData(username,password).subscribe(
   
   (response => {
     let message;
     if(response.hasOwnProperty('message')){
        message=response['message'];
     }
     if(message==='success'){
       role=response['userRole'];
       this.authenticated=true;
       sessionStorage.setItem('usernames',username);
       sessionStorage.setItem('role',role);
       resolve(true);
       
     }
     else{
       this.authenticated=false;
       reject(false);
     }
   })
   
 );
   })
   
    
  }
  

  // authentication(username,password){
  //   if(username=='misbah' && password=='rahman'){
  //     sessionStorage.setItem('usernames',username);
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  
  getUserData(username: any, password: any):Observable<any> {
    return this.http.get('http://localhost:8080/authenticateUser?userName='+username+'&password='+password)
  }

  getUserName(){
    return sessionStorage.getItem('usernames');
  }

  getUserRole(){
    return sessionStorage.getItem('role');
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('usernames');
    return !(user===null);
  }

  logOut(){
    sessionStorage.removeItem('usernames');
  }
}
