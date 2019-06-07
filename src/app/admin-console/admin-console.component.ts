import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TalentMgmServiceService } from '../service/talent-mgm-service.service';
import 'rxjs/add/operator/map';

export interface PeriodicElement {
  userName: string;
  userEmail: string;
  userId: string;
  userPassword: string;
  userGroup:string;
}



@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'userEmail', 'userId', 'userPassword','userGroup','action'];
  dataSource;//: MatTableDataSource<PeriodicElement>;
  userData:PeriodicElement[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(public dialog: MatDialog,private talentMgmService:TalentMgmServiceService) {
     //users : PeriodicElement[];
    
    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
   }

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    this.talentMgmService.getAllUSer().subscribe((userData: PeriodicElement[]) => {
      console.log("check1")
      console.log(userData)
      this.userData = userData;
      this.dataSource = new MatTableDataSource(userData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    console.log(this.dataSource)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCreateUpdateComponent, {
      width: '650px'
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(PeriodicElement) {
    alert("EDIT USER")
  }
  
}
