import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';




export interface item {
  itemId: any,
  name: any,
  price: any
}

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
interface invoiceItem {
  
  id: any,
  invoiceId: any,
  itemId: any
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  
})

export class InvoiceComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  amount: any;
  date: any;
  external: any;
  items: any;
  searchValue:any;
  responce:Map<String,String>;
  responseStr: string;
  invoice: invoice ;
  visible:any;
  invId:any;
  itemInvoice: invoiceItem [];
  options : string [];
  Items: item [];
  Items2: item [];

  dataSource :MatTableDataSource<item>;
  dataSource2 :MatTableDataSource<item>;

  public data: Object;



 

  constructor(private HttpServices: HttpService,
    private router: Router) {


      this.dataSource = new MatTableDataSource;
      this.dataSource2 = new MatTableDataSource;    }

  ngOnInit(): void {
    this.getItems();
    this.visible=true;
   this.options=JSON.parse(localStorage.getItem('names'));

this.data =this.options;


   this.Items=JSON.parse(localStorage.getItem('Items'));
   this.Items2=JSON.parse(localStorage.getItem('Items'));

   console.log(this.Items2);
   console.log(this.Items[1].itemId);
 


  console.log(this.dataSource);
  console.log(this.dataSource2);



  this.dataSource.data = this.Items;
  this.dataSource.paginator = this.tableOnePaginator;
  this.dataSource.sort = this.tableOneSort;

  this.dataSource2.data = this.Items;
  this.dataSource2.paginator = this.tableTwoPaginator;
  this.dataSource2.sort = this.tableTwoSort;

  }


 

  displayedColumnsOne: string[] = ['itemId', 'name', 'price'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;


  displayedColumnsTwo: string[] = ['itemId1', 'name1', 'price1'];
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.Table1;
  //   this.dataSource2.paginator = this.Table2;

  // }

  
 
  public sendInvoice(): void {
    type MyArrayType = Array<{ text: any }>;
    type obj = { amount: any; dateOfCreation: any; externalInvoiceId: any; items: MyArrayType };
    if(this.external =="" || this.date =="" || this.amount ==""||this.items ==""){
      alert("some fileds are empty please fill them");
    }else{
    const arr: obj = {
      dateOfCreation: this.date,
      externalInvoiceId: this.external,
      amount: this.amount,
      items: this.items,
    };

    console.log(arr);
    this.HttpServices.post('/api/Invoice/addInvoice', arr).subscribe(
      (response: any) => {
        console.log(response);
        if(response.status == 200){
          alert("INVOICE HAS BEEN CREATED");
        }
        else

            console.log(response);

        //
      },
      (error: any) => {
        if(error.status ==403){
          alert("YOU ARE NOT ALLOWED TO DO THAT ");
                 this.router.navigate(['../home']);
      }else if(error.status ==400){

        alert(error.headers.get('error'));


      }
          else{
            console.log(error);
        console.log(error.body);
        alert(error.status +" text"+ error.body);}
      }
    );
  }}
  


  public update(): void {
    type MyArrayType = Array<{ text: any }>;

    type obj = { amount: any; dateOfCreation: any; externalInvoiceId: any; items: MyArrayType };
   
    const arr: obj = {
      dateOfCreation: this.date,
      externalInvoiceId: this.external,
      amount: this.amount,
      items: this.items,
    };

    this.HttpServices.put('/api/Invoice/updateInvoice', arr).subscribe(
      (response: any) => {
        console.log(response);



        //
      },
      (error: any) => {
        if(error.status ==403){
          alert("YOU ARE NOT ALLOWED TO DO THAT ");
          this.router.navigate(['../home']);
        }
else{
        console.log(error);
        alert(error.error.text);
      }}
    );
  }

  createInvoice(amount: any, date: any,  items: any, external: any) {
    if(this.external =="" || this.date =="" || this.amount ==""||this.items ==""){
      console.log("in iffffff");
alert("fill empty fields");
    }else{
    this.amount = amount;
    this.date = date;
    this.items = items.split(',');
    this.external = external;
    console.log(external +"external");
    this.sendInvoice();}
  }

  updateInvoice(amount: any, date: any, items: any,external: any) {
    this.date = date;
    this.external = external;
    this.amount = amount;

    this.items = items.split(',');

    this.update();
  }

  searchInvoice(external: any) {
    this.external = external;
    console.log("this .ec       "+this.external);
    this.search();
  }

  deleteInvoice(external: any) {
    this.external = external;
    this.delete();
  }


  public search(): void {
   

    this.HttpServices.get('/api/Invoice/getInvoiceByEx/'+this.external).subscribe(
      (response: any) => {
        console.log(response);
        if(response.body != null){
        this.invoice = response.body;
        console.log(this.invoice);
        }else
        alert("NO INVOICE EXIST WITH THIS EXTERNAL INVOICE ID")
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }


  public delete(): void {
   
  let  externalInvoiceId=this.external;
    this.HttpServices.delete('/api/Invoice/deleteInvoice/'+this.external).subscribe(
      (response: any) => {
        console.log

        alert(response.error.text)
      
      },
      (error: any) => {
        if(error.status ==403){
          alert("YOU ARE NOT ALLOWED TO DO THAT ");
          this.router.navigate(['../home']);
        }
      }
    );
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }


  // show(invId :any):void{
  //   this.visible=!this.visible;
  //   this.invId=invId;
  //   this.next();

  // }

  // close():void{
  //   this.visible=!this.visible;
   
  // }

  // public next(): void {


  //   this.HttpServices.get("/api/Invoice/getItemsByInvoice/"+this.invId).subscribe(
  //     (response: any) => {
  //       console.log(response);

  //      this.itemInvoice =response.body;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //       alert(error.message);
  //     }
  //   );

  // }

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


   // console.log(localStorage.getItem(items.item));

  }

  applyFilterOne(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTwo(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }


}
