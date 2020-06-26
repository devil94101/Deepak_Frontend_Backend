import {Component} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'form-error',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  
})

export class InputErrorStateMatcherExample {

  constructor(private http:HttpClient){
  }
  data=[];
  height=0;
  value=0;
  bounces=0;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(100)
  ]);
  formatLabel(value: number) {
    return value
  }
  check(){
    if(this.data.length===0){
      return true;
    }
    return false;
  }
  async addData(sendData){
    let headers = {
      'Content-Type': 'application/json; charset=utf-8'
        }
     await this.http.post('http://localhost:3000/solve',sendData,{
      headers
     }).toPromise().then(res => {
       let temp=[]
       res['coor'].forEach((ele)=>{
         temp.push({
           x:ele[0],
           y:ele[1]
         })
       })
       this.data=[...temp]
       this.bounces=res['bounces']
     },err=>{
       console.log(err)
     })
     
  }
  onSubmit(){
    console.log('chala')
    let sendData={
      height:this.height,
      coeff:this.value
    }
    this.data=[]
    this.addData(sendData)
  }

  matcher = new MyErrorStateMatcher();
}