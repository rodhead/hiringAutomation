import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TalentMgmServiceService {
  
  saveNewUser(fd: FormData):Observable<any> {
    return this.http.post('http://localhost:8080/saveNewUser',fd,{responseType:'text'});
  }
  getDocToPdf(filepath: any): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');
 
    return this.http.get('http://localhost:8080/getTierDocToPdfView?filepath='+filepath, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
  
 
  downloadClasspathFile(filename: string): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');
 
    return this.http.get('http://localhost:8080/getResume', {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  downloadFirstTierDoc(fTierFilePath: any): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');
 
    return this.http.get('http://localhost:8080/getTierDocToDownload?filepath='+fTierFilePath, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
  
  
  DataTableData:any;
  tierFilePath:any;

  constructor(public  http:HttpClient) { }

  saveCandidate(formData:FormData):Observable<any>{
    return this.http.put('http://localhost:8080/saveCandidate', formData,{responseType: 'text'});
  }

  get _DataTableData():any{
    return this.DataTableData;
  }

  set _DataTableData(dataTable:any){
    this.DataTableData=dataTable;
  }

  get _tierFilePath():any{
    return this.tierFilePath;
  }

  set _tierFilePath(filePath:any){
    this.tierFilePath=filePath;
  }

  updateCandidate(candidateFOrmData: FormData) :Observable<any>{
    return this.http.put('http://localhost:8080/updateCandidate', candidateFOrmData,{responseType: 'text'});
  }

  getAllUSer(){
    return this.http.get('http://localhost:8080/getUsers');
  }

  generateCandidateId(value: any):Observable<any> {
    return this.http.get('http://localhost:8080/generateCandidateId?canRole='+value);
  }
}
