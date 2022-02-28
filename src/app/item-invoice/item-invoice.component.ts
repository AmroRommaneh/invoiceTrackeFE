import { Component, OnInit } from '@angular/core';
import 'lodash';

import { map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { find } from 'lodash';
import { Router } from '@angular/router';
import { Attachment } from '../Models/Attachment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';






import * as _ from 'lodash';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ItemComponent } from '../item/item.component';
interface invoiceItem {
  
  invoiceId: any,
   ItemId:any
}

@Component({
  selector: 'app-item-invoice',
  templateUrl: './item-invoice.component.html',
  styleUrls: ['./item-invoice.component.css']
})
export class ItemInvoiceComponent implements OnInit {

  itemInvoice: invoiceItem [];


  constructor(private HttpServices: HttpService
    ,    private router: Router, private dialog: MatDialog
    ){}
  ngOnInit(): void {
  }




 
  public next(invoice :any): void {


    this.HttpServices.get("/api/Invoice/getItemsByInvoice/"+invoice).subscribe(
      (response: any) => {
        console.log(response);

       this.itemInvoice =response.body;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );

  }

  

}
