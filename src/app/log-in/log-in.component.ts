import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {API_CONST, ROUTES, STORAGE} from '../services/shared.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  ngOnInit() {
    console.log("hiiii");
    localStorage.clear()
    this.visible=true;
  }


  uname :any;
  passsword:any;
  phoneNumber:any;
  email:any;
  visible:any;
  gender:any;


  constructor(private HttpServices: HttpService
    ,    private router: Router
    ){}
  jsonObject: JSON;

  

  public logIn(): void {

    type obj ={username: string, password: string};

    const  arr: obj =
      {
        username: this.uname,
        password:this.passsword
      };

    this.HttpServices.post("/authenticate",arr).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.headers.get('acces-token'));

       if(response.headers.get('acces-token') != null)
    localStorage.setItem(STORAGE.TOKEN, response.headers.get('acces-token'));
    this.router.navigate(['../home']);

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }

  log(username:any,passsword:any) {
    this.uname=username;
    this.passsword=passsword;

    this.logIn();
  }

  public signUp(): void {

    type obj ={name: string, 
      password: string,
      email:string
      phoneNumber:any,
      gender:any
    };

    const  arr: obj =
      {
        name: this.uname,
        password:this.passsword,
        email:this.email,
        phoneNumber:this.phoneNumber,
        gender:this.gender
      };

    this.HttpServices.post("/api/User/registerUser",arr).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['../login']);
        this.visible=!this.visible;

    //localStorage.setItem(STORAGE.TOKEN, 'Bearer '+response.headers.get('acces-token'));
      },
      (error: any) => {
        console.log(error);
        console.log(error.headers.get('error'));
        alert(error.headers.get('error'));
        
      }
    );
  }


  sign(
    username: string, 
      password: string,
      email:string,
      phoneNumber:any,
      gender:any
  ) {
    this.uname=username;
    this.passsword=password;
    this.email=email;
    this.phoneNumber=phoneNumber;
    this.gender=gender;

this.signUp();  }


changeVisible(){
  this.visible=!this.visible;
}

}
