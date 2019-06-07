import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
import { DataTablesModule } from 'angular-datatables';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { TalentManagementComponent } from './talent-management/talent-management.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { CandidateComponent } from './candidate/candidate.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { UserCreateUpdateComponent } from './admin-console/user-create-update/user-create-update.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { PdfReaderComponent } from './candidate/pdf-reader/pdf-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    TalentManagementComponent,
    CandidateComponent,
    AdminConsoleComponent,
    UserCreateUpdateComponent,
    PdfReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    Ng2OdometerModule.forRoot(),
    MatAutocompleteModule,
    DataTablesModule,
    NgxDocViewerModule,
    PdfViewerModule,
   MatBadgeModule,
   MatBottomSheetModule,
   MatButtonModule,
   MatButtonToggleModule,
   MatCardModule,
   MatCheckboxModule,
   MatChipsModule,
   MatStepperModule,
   MatDatepickerModule,
   MatDialogModule,
   MatDividerModule,
   MatExpansionModule,
   MatGridListModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatNativeDateModule,
   MatPaginatorModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatRippleModule,
   MatSelectModule,
   MatSidenavModule,
   MatSliderModule,
   MatSlideToggleModule,
   MatSnackBarModule,
   MatSortModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatTreeModule,
  ],
  entryComponents: [UserCreateUpdateComponent,PdfReaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
