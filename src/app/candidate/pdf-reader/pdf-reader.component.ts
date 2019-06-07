import { Component, OnInit } from '@angular/core';
import { TalentMgmServiceService } from 'src/app/service/talent-mgm-service.service';

@Component({
  selector: 'app-pdf-reader',
  templateUrl: './pdf-reader.component.html',
  styleUrls: ['./pdf-reader.component.css']
})
export class PdfReaderComponent implements OnInit {

  page:number = 1;
  pdfSrc:string = '';
  constructor(private talentMgmService:TalentMgmServiceService) { }

  ngOnInit() {
    alert("oninit")
    this.talentMgmService.getDocToPdf(this.talentMgmService._tierFilePath)
      .subscribe(response => {
        alert(response);
        console.log(response);
        //console.log(JSON.stringify(response.body.link));
        //this.doc=reader.readAsDataURL(response.body);
        const filename = response.headers.get('filename');
        console.log(response.body)
        this.displayPdf(response.body);
      });
  }
  displayPdf(data: any) {
    const blob = new Blob([data],{type: 'text/csv; charset=utf-8'});
    if(typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e:any) => {
        this.pdfSrc = e.target.result;
      }

      reader.readAsArrayBuffer(blob);
    }
  }
  

}
