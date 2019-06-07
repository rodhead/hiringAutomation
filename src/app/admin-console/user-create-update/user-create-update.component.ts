import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TalentMgmServiceService } from 'src/app/service/talent-mgm-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.css']
})
export class UserCreateUpdateComponent implements OnInit {
  createUser:any=FormGroup;
  myControl = new FormControl();
  options: string[] = ['Admin', 'Interviewer-1', 'Interviewer-2','HR','Priority User','General User'];
  filteredOptions: Observable<string[]>;

  
  constructor(private _formBuilder: FormBuilder, private tmTalentMgmServiceg:TalentMgmServiceService,
    private loginService:AuthenticationService,private router: Router,public dialogRef: MatDialogRef<UserCreateUpdateComponent>) {
    this.createUser=this._formBuilder.group({
      userId:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      userName:new FormControl('',[Validators.required]),
      emailId:new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  createUserLogin(userLogin:FormGroup){
    console.log(userLogin.value);
    if(userLogin.valid){
      let fd= new FormData();
      fd.append('userCreate',JSON.stringify(userLogin.value));
      fd.append('userLoggedIn',(this.loginService.getUserName()))
      fd.append('role',this.myControl.value)
      this.tmTalentMgmServiceg.saveNewUser(fd).subscribe(
        (response) =>{ console.log(response)
          this.dialogRef.close();
        if(JSON.stringify(response)==='success'){
          this.dialogRef.close();
        }
      }
      );
    }
    else{
      this.validateCandidateForm(userLogin);
    }
  }
  validateCandidateForm(candidateForm:FormGroup){
    Object.keys(candidateForm.controls).forEach(field=>{
      const control=candidateForm.get(field);
      if(control instanceof FormControl){
        control.markAsTouched({onlySelf:true});
      }
      else if (control instanceof FormGroup){
        this.validateCandidateForm(control);
      }
    });
  }

  closeFunction(){
    this.dialogRef.close();
  }
}
