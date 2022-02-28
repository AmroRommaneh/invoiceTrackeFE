
import {
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import 'lodash';

import { map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { find } from 'lodash';
import { Router } from '@angular/router';
import { Attachment } from '../Models/Attachment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../services/http.service';


interface User {
  
  userid: any,
  email: any,
  gender: any,
  name: any,
  phoneNumber:any
  roles:any
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Users: User [];
  


  i =-1;

  constructor(private HttpServices: HttpService
    ,    private router: Router
    ){}

  ngOnInit(): void {
    this.next10();

  }




  public next10(): void {
    this.i ++;

this.HttpServices.get("/api/User/getAllUsers?&page="+this.i+"&size=10&sort=userid,DESC").subscribe(
(response: any) => {
console.log(response);
this.Users = response.body.content;

},
(error: HttpErrorResponse) => {

  if(error.status ==403){
  alert("YOU ARE NOT ALLOWED TO VIEW USERS ");
  this.router.navigate(['../home']);

}
}
);

}

public prev10(): void {
  this.i --;

if(this.i>=0){
this.HttpServices.get("/api/User/getAllUsers?&page="+this.i+"&size=10&sort=userid,DESC").subscribe(
(response: any) => {
console.log(response);

this.Users = response.body.content;

},
(error: HttpErrorResponse) => {
console.log(error.message);
this.router.navigate(['../home']);

alert(error.message);

}
);

}
}

}



  

 


  


