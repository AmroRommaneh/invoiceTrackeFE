import {
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import { Router } from '@angular/router';

import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import {MatDialogModule,MatDialogConfig} from '@angular/material/dialog';

import {API_CONST, ROUTES, STORAGE,Items} from '../services/shared.constants';
import * as fileSaver from 'file-saver'; // npm i --save file-saver
import {DownloadService} from '../services/DownloadService';
 
import { HttpClient, HttpEventType } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { saveAs } from 'file-saver';





import 'lodash';
import * as _ from 'lodash';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ItemInvoiceComponent } from '../item-invoice/item-invoice.component';

interface invoice {

    invoiceId: any,
    dateOfCreation: any,
    amount: any,
    externalInvoiceId: any,
    attachmentList:any
    user:any,
    status:any,
    dateOfDeletion: any


}
interface Attachment {

  attachmentType: any,
        name: any,
        id: any
}
export interface item {
  item_id: any,
  name: any,
  price: any

}
export interface itemNames {
  name: any,

}


interface invoiceItem {
  id: any,
  invoiceId: any,
  itemId: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 
export class HomeComponent implements OnInit {
  thumbnail: any;

  Invoices: invoice [];
  message : any;
  visible:any;
  visibleAttachment:any;
  visibleImage:any;
  visiblePdf:any;
  invId:any;
   Items: item [];
   elements: item [];
   itemW: item;
   ele: any;
   itemId:any;
   visibleDetalis:any;
   ItemNames:itemNames [];
image:ImageData;
attachmentList:any [];
pdfSource :any;

  itemInvoice: invoiceItem [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;

 i =-1;
 responseStr :string;
  responce :any;
  Attachments :Attachment [];
  // filterInput = new FormControl('');
  // dataSource: any[];
  // originalData: any[];
  // numberOfPages;
  // page = 0;
  // tags$;
  // selectdTagValue;
  // originalTags;
  // originalImages: any;

  

  ngOnInit(): void {
    console.log("from home");
    this.visible=true;
    this.visibleDetalis=false;
    this.visibleAttachment=false;
    this.visibleImage=false;
  this.visiblePdf=false;

   this.next10();
   this.getItems();
   this.getItemsNames();

  }
  constructor(private HttpServices: HttpService
    ,    private router: Router, private dialog: MatDialogModule,private downloadService: DownloadService,private httpClient: HttpClient,private sanitizer: DomSanitizer
    ){}
  
  

  public moveInvoice(): void {
    console.log("invoice")
    this.router.navigate(['../invoice']);
  }
  public moveAttachment(): void {
    console.log("ataa")

    this.router.navigate(['../attachment']);
  }
  public moveItem(): void {
    console.log("itemm")

    this.router.navigate(['../item']);
  }

  public next10(): void {
    console.log(this.i);
    this.i ++;

             //  http://localhost:8060/api/Invoice/getAllInvoices?&page=0&size=10&sort=id,DESC
    this.HttpServices.get("/api/Invoice/getAllInvoices?&page="+this.i+"&size=10&sort=id,DESC").subscribe(
      (response: any) => {
        console.log(response);


        

       this.responce=response;
       this.Invoices = response.body.content;

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );

  }

  public prev10(): void {
    console.log(this.i);

    this.i --;

if(this.i>=0){
    this.HttpServices.get("/api/Invoice/getAllInvoices?&page="+this.i+"&size=10&sort=id,DESC").subscribe(
      (response: any) => {
        console.log(response);

       this.Invoices = response.body.content;

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );

    }else
    alert("YOU ARE ON THE FIRST PAGE");
  }


  show(invId :any):void{
    this.visible=!this.visible;
    this.invId=invId;
    this.next();

  }

  showAttachment(attachment :any):void{
    this.visibleAttachment=!this.visibleAttachment;
    this.attachmentList=attachment;
    this.getAttachments(attachment);

  }

  close():void{
    this.visible=!this.visible;
   
  }

  closeD():void{
    this.visibleDetalis=!this.visibleDetalis;
   
  }

  closeA():void{
    this.visibleAttachment=!this.visibleAttachment;
   
  }

  public next(): void {
    this.HttpServices.get("/api/Invoice/getItemsByInvoice/"+this.invId).subscribe(
      (response: any) => {
        console.log(response);

        this.itemInvoice=response.body;

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  public delete(externalInvoiceId :any): void {
   
      this.HttpServices.delete('/api/Invoice/deleteInvoice/'+externalInvoiceId).subscribe(
        (response: any) => {
          console.log(response);
  
          alert(response);
          this.router.navigate(['../home']);

        
        },
        (error: any) => {
          if(error.status ==403)
          alert("YOU ARE NOT ALLOWED TO DO THAT ");
          else
          alert(error.error.text);
        }
      );
    }



    getItems() : void {

      this.HttpServices.get("/api/Item/getItems").subscribe(
        (response: any) => {
          
          this.Items=response.body;

          console.log(this.Items);

          localStorage.setItem('Items', JSON.stringify(this.Items));
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );

 this.elements  =JSON.parse(localStorage.getItem(Items.item));

     // console.log(localStorage.getItem(items.item));
  
    }

    getAttachments(inv : any) : void {

      this.HttpServices.get("/api/attachment/getAllAttachment/"+inv).subscribe(
        (response: any) => {
          
          this.Attachments=response.body;

          console.log(this.Attachments);

  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );


     // console.log(localStorage.getItem(items.item));
      }

    showItem(itemId :any):void{
      this.visibleDetalis=!this.visibleDetalis;
      this.itemId=itemId;
      this.getItem();
  
    }
    getItem() : void {

      this.HttpServices.get("/api/Item/getItems/"+this.itemId).subscribe(
        (response: any) => {
          
          this.itemW=response.body;
          console.log(this.itemW);


        
        // localStorage.setItem(STORAGE.List,this.Items);
  
         //
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );

     // console.log(localStorage.getItem(items.item));
  
    }

    

    getItemsNames() : void {

      this.HttpServices.get("/api/Item/getItemsNames").subscribe(
        (response: any) => {
          
          this.ItemNames=response.body;
          console.log(this.ItemNames);


        
        localStorage.setItem('names',JSON.stringify(this.ItemNames));
  
         //
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );

     // console.log(localStorage.getItem(items.item));
  
    }


    getImage(attch : any ,type :string) : void {
console.log(type);
      if(type ==="IMAGE"){
        console.log("imahhhhhhhh");
      this.visibleImage=!this.visibleImage;

        //Make a call to Sprinf Boot to get the Image Bytes.
        this.httpClient.get('http://localhost:8060/api/attachment/getAttachment/' + attch,{
          headers: new HttpHeaders({
            'Accept': 'image/jpeg',
          }),
          responseType: 'blob' 
        })
          .subscribe(
           (response1: any) => saveAs(response1, 'image'));
           //{
          //     console.log(response);

          //     // let objectURL = 'data:image/jpeg;base64,' + response.image;

          //     // this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //     this.retrieveResonse = response.body;
          //      this.base64Data = response.image;
          //     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          //     console.log(this.retrieveResonse);
          //   }, (error: HttpErrorResponse) => {
          //     console.log(error);
          //     alert(error.message);
          //   }
          // );
      }
      else if(type==="PDF"){
      this.visiblePdf=!this.visiblePdf;
      //Make a call to Sprinf Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8060/api/attachment/getAttachment/' + attch,{
        headers: new HttpHeaders({
          'Accept': 'application/pdf',
        }),
        responseType: 'blob' 
      })
        .subscribe(
          (response: Blob) => saveAs(response, 'test'));
//             var file = new Blob([response], { type: 'application/pdf' })
//             var fileURL = URL.createObjectURL(file);
//             // let objectURL = 'data:image/jpeg;base64,' + response.image;

// console.log(fileURL);
//             // this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
//            this.pdfSource=fileURL;
//           }, (error: HttpErrorResponse) => {
//             console.log(error);
//             alert(error.message);
//           }
//         );

      
      }
    

    }
 
   
    
   



}

