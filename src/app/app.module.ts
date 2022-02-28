import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/http.service';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {  LogInComponent} from './log-in/log-in.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ItemComponent } from './item/item.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorProviders } from '../app/services/auth.interceptor';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemInvoiceComponent } from './item-invoice/item-invoice.component';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {ReactiveFormsModule} from '@angular/forms';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule,MatDialogConfig} from '@angular/material/dialog';

import {MatTableModule} from '@angular/material/table';

import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';

import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,

    InvoiceComponent,
    ItemComponent,
    AttachmentComponent,
    HomeComponent,InvoiceComponent,ItemComponent,AttachmentComponent, UserComponent, ItemInvoiceComponent
    
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
BrowserAnimationsModule,MatSelectModule,MatAutocompleteModule,ReactiveFormsModule,ListViewModule,MatPaginatorModule,MatDialogModule,PdfViewerModule,
    MatTableModule,MatSortModule
    
      ],
      providers: [HttpService ,AuthInterceptorProviders,PdfViewerComponent],
  bootstrap: [AppComponent],
  entryComponents:[InvoiceComponent]
  
})
export class AppModule { }






