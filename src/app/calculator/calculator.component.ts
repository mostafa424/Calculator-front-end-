import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent  {
  result:any="";
  button:any;
  text:any;
  constructor(private http: HttpClient){}
    sendRequest(message:string) {
      const headers = new HttpHeaders({'Content-Type': 'application/calculator'})
      this.http.post('http://localhost:8080/CalculatorController', message, {headers: headers, responseType: 'text'})
        .subscribe((response) => {
          this.text.value = response
        })
    }

  onClickEvent(id:string){
    this.button=document.getElementById(id.toString());
    this.text=document.getElementById("operation");
    if(this.text.value=="E"){this.text.value="";}
      switch (this.button.id) {
        case "C":
          this.text.value = "";
          break;
        case"^2":
        case"r":
          this.sendRequest(this.result + " " + this.button.value + " ");
          break;
        case "=":
          this.sendRequest(this.result);
          break;
        case"+":
        case"-":
        case"*":
        case"^":
        case"/":
          this.text.value += " " + this.button.value + " ";
          break;
        default:
          this.text.value += this.button.value;
          break;
      }
      this.result=this.text.value;
  }
}
