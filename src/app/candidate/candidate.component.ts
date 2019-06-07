import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TalentMgmServiceService } from '../service/talent-mgm-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fileSaver from 'file-saver';
import { AuthenticationService } from '../service/authentication.service';
import { PdfReaderComponent } from './pdf-reader/pdf-reader.component';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  togMsg:string='Read-Only Mode';
  urli:any;
  check:string='false';
  FirstName:string;
  CandidateRole:string;
  canStatus:string;
  saveMessage:string;
  public userFile:any=File;
  public userFile2:any=File;
  public userFile3:any=File;
  fileName:string;
  fileName2:string;
  fileName3:string;
  myControl = new FormControl();
  options: string[] = ['Ashok','Karthik', 'Kaushik', 'Gaurav','Harish'];
  options2: string[] = ['Ashok','Karthik', 'Kaushik', 'Gaurav','Harish'];
  options3: string[] = ['Ashok','Karthik', 'Kaushik', 'Gaurav','Harish'];
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  filteredOptions: Observable<string[]>;
  doc:string="https://raw.githubusercontent.com/rodhead/Docs/master/BellanduruKML.kml";
  //doc:any;
  fileSystemName: string;
  classpathFileName: string;
  page:number = 1;
  pdfSrc:string = '';
  ftierFileView='';
  stierFileView='';
  ttierFileView='';
  fTierFlag=false;
  sTierFlag=false;
  tTierFlag=false;

  // onChange($event) {
  //   if($event.checked===true){
  //     this.togMsg='Edit Mode';
  //     this.formEdit();
  //   }
  //   else{
  //     this.togMsg='Read-Only Mode';
  //     this.formReadOnly();
  //   }
  //   console.log($event.checked);
  // }
  candidateID:string;
  childCandidateForm:any=FormGroup;


  constructor(private _formBuilder: FormBuilder,private talentMgmService:TalentMgmServiceService,
    private TalentMgmService:TalentMgmServiceService,private snackBar: MatSnackBar,private router: Router,
    private loginService:AuthenticationService,public dialog: MatDialog) {
    
   }

   

  ngOnInit() {
    let fTierViewList;
    let sTierViewList;
    let tTierViewList
    fTierViewList=this.talentMgmService.DataTableData['fTierFilePath'].split('/');
    if(fTierViewList.length>0){
      this.fTierFlag=true;
      this.ftierFileView=fTierViewList[fTierViewList.length-1];
      this.fileName=fTierViewList[fTierViewList.length-1];
    }
    
    if(this.talentMgmService.DataTableData['sTierFilePath']!=null){
    sTierViewList=this.talentMgmService.DataTableData['sTierFilePath'].split('/');
    if(sTierViewList.length>0){
      this.sTierFlag=true;
      this.stierFileView=sTierViewList[sTierViewList.length-1];
      this.fileName2=sTierViewList[sTierViewList.length-1];
    }
  }

  if(this.talentMgmService.DataTableData['tTierFilePath']!=null){
    tTierViewList=this.talentMgmService.DataTableData['tTierFilePath'].split('/');
    if(tTierViewList.length>0){
      this.tTierFlag=true;
      this.ttierFileView=tTierViewList[tTierViewList.length-1];
      this.fileName3=tTierViewList[tTierViewList.length-1];
    }
  }
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.candidateID=this.talentMgmService.DataTableData['candidateID'];
    this.FirstName=this.talentMgmService.DataTableData['fullName'];
    this.CandidateRole=this.talentMgmService.DataTableData['candidateRole'];
    this.canStatus=this.talentMgmService.DataTableData['candidateStatus'];
    console.log("datatble val in candidate page");
    console.log(this.talentMgmService.DataTableData['emailId']);
    Object.keys(this.talentMgmService.DataTableData).forEach(key => {
      if(key===this.childCandidateForm.currentCompanyName){
        console.log(this.talentMgmService.DataTableData[key])
      }
      let value = this.talentMgmService.DataTableData[key];
      console.log(`key is ${key} and value is ${value}`);
    });
    this.formEdit();
    
    // if(this.talentMgmService.DataTableData['fTierInterviewer']!=null || this.talentMgmService.DataTableData['fTierInterviewer'] ===undefined){
    //   alert(this.talentMgmService.DataTableData['fTierInterviewer'])
    // this.myControl.setValue=this.talentMgmService.DataTableData['fTierInterviewer'];
    // }
    this.myControl.patchValue(this.talentMgmService.DataTableData['fTierInterviewer']);
    this.myControl2.patchValue(this.talentMgmService.DataTableData['sTierInterviewer']);
    this.myControl3.patchValue(this.talentMgmService.DataTableData['tTierInterviewer']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  formEdit(){
    
    this.childCandidateForm=this._formBuilder.group({
      currentCompanyName:new FormControl(this.talentMgmService.DataTableData['currentCompanyName'], [Validators.required, Validators.maxLength(30)]),
      durationCurrentCompany: new FormControl(this.talentMgmService.DataTableData['durationInCurComp'], [Validators.required]),
      totalExperience:new FormControl(JSON.stringify(this.talentMgmService.DataTableData['totalExperience']), [Validators.required]),
       expInAnalytics:new FormControl(this.talentMgmService.DataTableData['expInAnalytics'], [Validators.required]),
      emailId:new FormControl(this.talentMgmService.DataTableData['emailId'],[Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.talentMgmService.DataTableData['contactNumber'],[Validators.required,Validators.pattern("^[6-9][0-9]{9}$")]),
      preferredLocation:new FormControl(this.talentMgmService.DataTableData['preferredLocation']),
      reasonForChange:new FormControl(this.talentMgmService.DataTableData['reasonForJobChng']),
      lastApprDate:new FormControl(new Date(this.talentMgmService.DataTableData['lastAppraisalDate'])),
      currentCtc:new FormControl(this.talentMgmService.DataTableData['expectedCTC'],[Validators.pattern("^[6-9][0-9]{9}$")]),
      expectedCtc:new FormControl(this.talentMgmService.DataTableData['expectedCTC'],[Validators.pattern("^[6-9][0-9]{9}$")]),
      currentLocation:new FormControl(this.talentMgmService.DataTableData['currentLocation']),
      noticePeriod:new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticePeriod']),[Validators.required]),
      noticeNegotiable: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticeNegotiable'])),
      noticeBuyOut: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticeBuyOut'])),
      offerInHand: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['offerInHand'])),
      reasonMoreOffer: new FormControl(this.talentMgmService.DataTableData['reasonForMoreOffers']),
      numOfProject: new FormControl(this.talentMgmService.DataTableData['numberOfProjects']),
      firstTierResult: new FormControl((this.talentMgmService.DataTableData['firstTierResult'])),
      secondTierResult: new FormControl((this.talentMgmService.DataTableData['secondTierResult'])),
      thirdTierResult: new FormControl((this.talentMgmService.DataTableData['thirdTierResult'])),
      finalFB:new FormControl(this.talentMgmService.DataTableData['finalFB'])
    });
  }

  // formReadOnly(){
  //   this.childCandidateForm=this._formBuilder.group({
  //     currentCompanyName:new FormControl(this.talentMgmService.DataTableData['currentCompanyName']),
  //     durationCurrentCompany: new FormControl(this.talentMgmService.DataTableData['durationInCurComp']),
  //     totalExperience:new FormControl(JSON.stringify(this.talentMgmService.DataTableData['totalExperience'])),
  //     expInAnalytics:new FormControl(this.talentMgmService.DataTableData['expInAnalytics']),
  //     emailId:new FormControl(this.talentMgmService.DataTableData['emailId']),
  //     phoneNumber: new FormControl(this.talentMgmService.DataTableData['contactNumber']),
  //     preferredLocation:new FormControl(this.talentMgmService.DataTableData['preferredLocation']),
  //     reasonForChange:new FormControl(this.talentMgmService.DataTableData['reasonForJobChng']),
  //     lastApprDate:new FormControl(new Date(this.talentMgmService.DataTableData['lastAppraisalDate'])),
  //     currentCtc:new FormControl(this.talentMgmService.DataTableData['currentCTC']),
  //     expectedCtc:new FormControl(this.talentMgmService.DataTableData['expectedCTC']),
  //     currentLocation:new FormControl(this.talentMgmService.DataTableData['currentLocation']),
  //     noticePeriod:new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticePeriod'])),
  //     noticeNegotiable: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticeNegotiable'])),
  //     noticeBuyOut: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['noticeBuyOut'])),
  //     offerInHand: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['offerInHand'])),
  //     reasonMoreOffer: new FormControl(this.talentMgmService.DataTableData['reasonMoreOffer']),
  //     numOfProject: new FormControl(this.talentMgmService.DataTableData['numOfProject']),
  //     firstTierResult: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['firstTierResult'])),
  //     secondTierResult: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['secondTierResult'])),
  //     thirdTierResult: new FormControl(JSON.stringify(this.talentMgmService.DataTableData['thirdTierInterviewer']))
  //   });
    
  //   this.childCandidateForm.get('currentCompanyName').disable();
  //   this.childCandidateForm.get('durationCurrentCompany').disable();
  //   //this.childCandidateForm.get('totalExperience').disable();
  //   this.childCandidateForm.get('expInAnalytics').disable();
  //   this.childCandidateForm.get('emailId').disable();
  //   this.childCandidateForm.get('phoneNumber').disable();
  //   this.childCandidateForm.get('preferredLocation').disable();
  //   this.childCandidateForm.get('reasonForChange').disable();
  //   this.childCandidateForm.get('lastApprDate').disable();
  //   this.childCandidateForm.get('currentCtc').disable();
  //   this.childCandidateForm.get('expectedCtc').disable();
  //   this.childCandidateForm.get('currentLocation').disable();
  //   //this.childCandidateForm.get('noticePeriod').disable();
  //   //this.childCandidateForm.get('noticeNegotiable').disable();
  //   //this.childCandidateForm.get('noticeBuyOut').disable();
  //   //this.childCandidateForm.get('offerInHand').disable();
  //   this.childCandidateForm.get('reasonMoreOffer').disable();
  //   this.childCandidateForm.get('numOfProject').disable();
  // }

  checkValue(){
    console.log(this.childCandidateForm.get("emailId").value)
    alert(this.talentMgmService.DataTableData['id']);
  }

  updateCandidate(){
    const candidateFOrmData= new FormData();
      candidateFOrmData.append('userId',(this.loginService.getUserName()));
      candidateFOrmData.append('fullName',this.talentMgmService.DataTableData['fullName']);
      candidateFOrmData.append('id',this.talentMgmService.DataTableData['id']);
      candidateFOrmData.append('candidateId',this.talentMgmService.DataTableData['candidateID']);
      candidateFOrmData.append('candidateRole',this.talentMgmService.DataTableData['candidateRole']);
      candidateFOrmData.append('candGenInfo',JSON.stringify(this.childCandidateForm.value));
      if(this.userFile != null){
      candidateFOrmData.append('firstTierFile', this.userFile);
      }
      if(this.userFile2 != null){
        candidateFOrmData.append('secondTierFile', this.userFile2);
       }
      if(this.userFile3 != null){
          candidateFOrmData.append('thirdTierFile', this.userFile3);
       }
      candidateFOrmData.append('ftierInterviewer', this.myControl.value);
      candidateFOrmData.append('stierInterviewer', this.myControl2.value);
      candidateFOrmData.append('ttierInterviewer', this.myControl3.value);
      console.log(JSON.stringify(candidateFOrmData))
      this.TalentMgmService.updateCandidate(candidateFOrmData).subscribe((response) => {
        if(response==='success'){
          this.openSnackBar('Success!','Candidate Updated.');
          this.saveMessage=response+'!';
          this.router.navigate(['']);
        }
        console.log(response);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  onSelectFiles(event){
    const file=event.target.files[0];
    this.userFile=file;
    this.fileName=file.name;
  }
  onSelectFiles2(event){
    const file2=event.target.files[0];
    this.userFile2=file2;
    this.fileName2=file2.name;
  }
  onSelectFiles3(event){
    const file3=event.target.files[0];
    this.userFile3=file3;
    this.fileName3=file3.name;
    
  }

  downloadFirstTierDoc(){
    let filename_actual=(this.talentMgmService.DataTableData['fTierFilePath']).split("/");
    
    this.TalentMgmService.downloadFirstTierDoc(this.talentMgmService.DataTableData['fTierFilePath'])
      .subscribe(response => {
        console.log(response);
        //console.log(JSON.stringify(response.body.link));
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log('filename'+filename_actual[filename_actual.length-1]);
        this.saveFile(response.body, filename_actual[filename_actual.length-1]);
      });
  }
  
  downloadSecondTierDoc(){
    let filename_actual=(this.talentMgmService.DataTableData['sTierFilePath']).split("/");
    
    this.TalentMgmService.downloadFirstTierDoc(this.talentMgmService.DataTableData['sTierFilePath'])
      .subscribe(response => {
        console.log(response);
       // console.log(JSON.stringify(response.body.link));
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log('filename'+filename_actual[filename_actual.length-1]);
        this.saveFile(response.body, filename_actual[filename_actual.length-1]);
      });
  }

  downloadThirdTierDoc(){
    let filename_actual=(this.talentMgmService.DataTableData['tTierFilePath']).split("/");
    
    this.TalentMgmService.downloadFirstTierDoc(this.talentMgmService.DataTableData['tTierFilePath'])
      .subscribe(response => {
        console.log(response);
       // console.log(JSON.stringify(response.body.link));
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log('filename'+filename_actual[filename_actual.length-1]);
        this.saveFile(response.body, filename_actual[filename_actual.length-1]);
      });
  }
  downloadResume(){
    let filename_actual=(this.talentMgmService.DataTableData['resumeFilePath']).split("/");
    
    this.TalentMgmService.downloadFirstTierDoc(this.talentMgmService.DataTableData['resumeFilePath'])
      .subscribe(response => {
        console.log(response);
       // console.log(JSON.stringify(response.body.link));
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log('filename'+filename_actual[filename_actual.length-1]);
        this.saveFile(response.body, filename_actual[filename_actual.length-1]);
      });
  }
  openDialogTierOne(){
    this.talentMgmService._tierFilePath=this.talentMgmService.DataTableData['fTierFilePath'];
    this.openDialog();
  }
  openDialogTierTwo(){
    this.talentMgmService._tierFilePath=this.talentMgmService.DataTableData['sTierFilePath'];
    this.openDialog();
  }
  openDialogTierThree(){
    this.talentMgmService._tierFilePath=this.talentMgmService.DataTableData['tTierFilePath'];
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PdfReaderComponent, {
      width: '950px'
    });
  }

  downloadFileSystem() {
    //var reader = new FileReader();
    this.TalentMgmService.downloadClasspathFile(this.fileSystemName)
      .subscribe(response => {
        console.log(response);
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log('filename'+filename);
        this.saveFile(response.body, 'sample.pdf');
      });
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data],{type: 'text/csv; charset=utf-8'});
    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e:any) => {
        this.pdfSrc = e.target.result;
      }

      reader.readAsArrayBuffer(blob);
    }
    this.urli=window.URL.createObjectURL(blob);
    console.log('urli '+this.urli);
    fileSaver.saveAs(blob, filename);
  }
  onFileSelected() {
  let $img: any = document.querySelector('#file');
 
  if (typeof (FileReader) !== 'undefined') {
    let reader = new FileReader();
 
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
 
    reader.readAsArrayBuffer($img.files[0]);
  }
}
}
