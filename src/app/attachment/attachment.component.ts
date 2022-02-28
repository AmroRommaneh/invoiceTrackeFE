import { Component, OnInit } from '@angular/core';

import { FileUploadService } from '../file-upload.service';
  import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {

  
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  // Inject service 
  constructor(private fileUploadService: FileUploadService,private HttpServices: HttpService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  // // On file Select
  // onChange(event) {
  //     this.file = event.target.files[0];
  // }

  // // OnClick of button Upload
  // onUpload() {
  //     this.loading = !this.loading;
  //     console.log(this.file);
  //     this.fileUploadService.upload(this.file).subscribe(
  //         (event: any) => {
  //             if (typeof (event) === 'object') {

  //                 // Short link via api response
  //                 this.shortLink = event.link;

  //                 this.loading = false; // Flag variable 
  //             }
  //         }
  //     );
  // }

  sendImage(photo :any,external :any){

    this.HttpServices.post("/api/image/"+external,photo).subscribe(
        (response: any) => {
          console.log(response);
  
         //
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );
      
  }

  sendPdf(pdf :any,external:any){

    this.HttpServices.post("/api/image/"+external,pdf).subscribe(
        (response: any) => {
          console.log(response);
  
         //
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );
      
  }

  sendWeb(form :any,external:any){

    this.HttpServices.post("/api/uoloadPDF/"+external,form).subscribe(
        (response: any) => {
          console.log(response);
  
         
  
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        }
      );
      
  }


  selectedFile: any;

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }

  onUploadImage(external :any) {
    // upload code goes here
    const fd =new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.http.post("http://localhost:8060/api/attachment/image/"+external,fd).subscribe(res=>{

console.log("in post");
      console.log(res);
      alert("ATTACHMENT HAS BEEN ADDED");

    },
    (error: any) => {
      console.log(error.headers.get('error'));

        alert(error.headers.get('error'));
      
    });
  }

  onUploadPdf(external :any) {
    // upload code goes here
    const fd =new FormData();
    fd.append('pdf',this.selectedFile,this.selectedFile.name);
    this.http.post("http://localhost:8060/api/attachment/uoloadPDF/"+external,fd).subscribe(res=>{
console.log("in post");
      console.log(res);
      alert("ATTACHMENT HAS BEEN ADDED");
    },
    (error: any) => {
      console.log(error.headers.get('error'));

        alert(error.headers.get('error'));
      
    });
  }

  onUploadWeb(external :any) {
    // upload code goes here
    const fd =new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.http.post("http://localhost:8060/api/attachment/uoloadWEB/"+external,fd).subscribe(res=>{
console.log("in post");
      console.log(res);
      alert("ATTACHMENT HAS BEEN ADDED");

    },
    (error: any) => {
      console.log(error.headers.get('error'));

        alert(error.headers.get('error'));
      
    });
  }



    
  
  
  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0]
      
  }
     

}



