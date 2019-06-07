import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { TalentMgmServiceService } from '../service/talent-mgm-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-talent-management',
  templateUrl: './talent-management.component.html',
  styleUrls: ['./talent-management.component.css']
})
export class TalentManagementComponent implements AfterViewInit, OnInit {
   candidateId:string;
  number:number=100;
  myControl = new FormControl();
  options: string[] = ['Data Scientist', 'Data Analyst', 'Intern','Senior Data Scientist','DevOp','Data Engineer'];
  filteredOptions: Observable<string[]>;
  isLinear = false;
  experience: any[]=[0,1,2,3,4,5,6,7,8,9,10,11,12];
  noticePeriod:any[]=['Immediate','1 month','2 months','3 months','4 months'];
  saveMessage:string;
  //firstFormGroup: any = FormGroup;
  
  secondFormGroup:any= FormGroup;
  public userFile:any=File;
  fileName:string;
  candidateInfoFormgroup:any=FormGroup;
  candidateStartInfo:any=FormGroup;
  actionPerformFormGroup: any=FormGroup;
  thirdFormGroup: any= FormGroup;
  message = '';
  dtOptions: any = {};
  datatableVal:any;
  //candidateId:string;

  someClickHandler(info: any): void {
    this.message = info.candidateID + ' : ' + info.firstName+' : '+info.candidateRole+' : '+info.emailId;
    this.TalentMgmService.DataTableData=info;

  }

  constructor(private authService:AuthenticationService,private _formBuilder: FormBuilder,
    private renderer: Renderer, private router: Router,private TalentMgmService:TalentMgmServiceService,private snackBar: MatSnackBar
    ,private loginService:AuthenticationService) { 
    this.candidateStartInfo=this._formBuilder.group({
      Candidate:new FormControl(''),
    });
    this.candidateInfoFormgroup=this._formBuilder.group({
      fullName:new FormControl('',[Validators.required,Validators.maxLength(30)]),
      currentCompanyName:new FormControl('', [Validators.required]),
      durationCurrentCompany: new FormControl('', [Validators.required]),
      totalExperience:new FormControl('', [Validators.required]),
      expInAnalytics:new FormControl('', [Validators.required]),
      emailId:new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('',[Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]),
      preferredLocation:new FormControl(''),
      reasonForChange:new FormControl(''),
      lastApprDate:new FormControl(''),
      currentCtc:new FormControl('',[Validators.pattern("\\-?\\d*\\.?\\d{1,2}")]),
      expectedCtc:new FormControl('',[Validators.pattern("\\-?\\d*\\.?\\d{1,2}")]),
      currentLocation:new FormControl(''),
      noticePeriod:new FormControl('',[Validators.required]),
      noticeNegotiable: new FormControl(''),
      noticeBuyOut: new FormControl(''),
      offerInHand: new FormControl(''),
      reasonForMoreOffer:new FormControl(''),
      numOfProjectsDetails:new FormControl('')
    });

    
    
  }

  ngOnInit():void {
    this.TalentMgmService.DataTableData=null;
    //this.candidateStartInfo.controls.Candidate.setValue(this.candidateId);
    this.candidateStartInfo.controls['Candidate'].disable();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      // this.firstFormGroup = this._formBuilder.group({
      //   firstCtrl: ['', Validators.required]
      // });
      // this.secondFormGroup = this._formBuilder.group({
      //   secondCtrl: ['', Validators.required]
      // });
      this.dtOptions = {
      ajax: 'http://localhost:8080/getAllCandidate',
      columns: [{
        title: 'CanID',
        data: 'candidateID'
      }, {
        title: 'Status',
        data: 'candidateStatus'
      }, {
        title: 'Role',
        data: 'candidateRole'
      }, {
        title: 'Name',
        data: 'fullName'
      }, {
        title: 'Experience',
        data: 'totalExperience'
      }, {
        title: 'Current Company',
        data: 'currentCompanyName'
      }, {
        title: 'Duration in Company :',
        data: 'durationInCurComp',
        class: 'none'
      }, {
        title: 'Exp. Analytics',
        data: 'expInAnalytics'
      }, {
        title: 'Email ID',
        data: 'emailId'
      }, {
        title: 'Contact Number',
        data: 'contactNumber'
      }, {
        title: 'Preferred Loc :',
        data: 'preferredLocation',
        class: 'none'
      }, {
        title: 'Job Change Reason :',
        data: 'reasonForJobChng',
        class: 'none'
      }, {
        title: 'Last Appr Date :',
        data: 'lastAppraisalDate',
        class: 'none'
      }, {
        title: 'Current CTC',
        data: 'currentCTC'
      }, {
        title: 'Expected CTC',
        data: 'expectedCTC'
      }, {
        title: 'Current Loc',
        data: 'currentLocation'
      }, {
        title: 'Notice Period',
        data: 'noticePeriod'
      }, {
        title: 'Notice Negotiable :',
        data: 'noticeNegotiable',
        class: 'none'
      }, {
        title: 'Notice By-Out :',
        data: 'noticeBuyOut',
        class: 'none'
      }, {
        title: 'Offer in Hand :',
        data: 'offerInHand',
        class: 'none'
      }, {
        title: 'Reason +1 Offers :',
        data: 'reasonForMoreOffers',
        class: 'none'
      }, {
        title: 'Number of Projects :',
        data: 'numberOfProjects',
        class: 'none'
      }, {
        title: 'Created By :',
        data: 'createdBy',
        class: 'none'
      }, {
        title: 'Created Date :',
        data: 'createdDate',
        class: 'none'
      },
       {
        title: 'Updated By :',
        data: 'updatedBy',
        class: 'none'
      }, {
        title: 'Updated Date :',
        data: 'updatedDate',
        class: 'none'
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      },
      responsive: true,
      pageLength: 20,
      select: true,
      scrollY:        '70vh',
      scrollCollapse: true,
      "ordering": false,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [ 
        'colvis',
        'copy',
        'print',
        'excel',
        
      ]
    };

    
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("view-person-id")) {
        this.router.navigate(["/person/" + event.target.getAttribute("view-person-id")]);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSelectFiles(event){
    const file=event.target.files[0];
    this.userFile=file;
    this.fileName=file.name;
  }

  gotoCandidatePage(){
    
    console.log(this.TalentMgmService.DataTableData);
    if(this.TalentMgmService.DataTableData !=undefined || this.TalentMgmService.DataTableData != null){
      this.router.navigate(['/candidate']);
    }
    else{
      alert("Select Row to Edit Candidate");
    }
    
  }

  submitCandidateForm(candidateForm:FormGroup){
    console.log(this.thirdFormGroup.value);
    console.log(candidateForm.valid);
    if(candidateForm.valid){
      let candidateGenForm=candidateForm.value;
      const candidateFOrmData= new FormData();
      candidateFOrmData.append('userId',JSON.stringify(this.loginService.getUserName()));
      candidateFOrmData.append('resume',this.userFile);
      candidateFOrmData.append('candidateId',this.candidateId);
      candidateFOrmData.append('candidateRole',this.myControl.value);
      candidateFOrmData.append('candGenInfo',JSON.stringify(candidateForm.value));
      this.TalentMgmService.saveCandidate(candidateFOrmData).subscribe((response) => {
        if(response==='success'){
          this.openSnackBar('Success!','Candidate Created.');
          window.location.reload();
        }
        console.log(response);
      });
    }
    else{
      this.validateCandidateForm(candidateForm);
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  getCandidateId($event){
    console.log($event.option.value);
    this.TalentMgmService.generateCandidateId($event.option.value).subscribe(
      (response) =>{ this.candidateStartInfo.controls.Candidate.setValue(response.canId);
        this.candidateId=response.canId}
    );
  }
}
