import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {API_CONST, ROUTES, STORAGE} from '../services/shared.constants';
interface item {
  
  itemId: any,
  name: any,
  quantity: any,
  price: any
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  Items: item [];

  name :any;
  price:any;
  amount:any;
  

  constructor(private HttpServices: HttpService) { }

  ngOnInit(): void {

  }
  public sendItem(): void {

    type obj ={name: any, price: any,amount : any};
    const  arr: obj =
      {
        name: this.name,
        price:this.price,
        amount:this.amount
      };
    this.HttpServices.post("/api/Item/addItem",arr).subscribe(
      (response: any) => {
        console.log(response);
        if(response.status == 200){
          alert("ITEM HAS BEEN ADDED");
        }

       //

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
}


  addItem(name:any,price:any,amount:any) {
    this.name=name;
    this.amount=amount;
    this.price=price;

    this.sendItem();
  }


  getItems() : void {

    this.HttpServices.get("/api/Item/getItems").subscribe(
      (response: any) => {
        this.Items=response;
        console.log(this.Items);
      // localStorage.setItem(STORAGE.List,this.Items);

       //

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );


  }


}
