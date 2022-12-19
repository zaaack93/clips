import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credantials={
    email:"",
    password:""
  }
  SubmitForm(f: NgForm){
    console.log(this.credantials)
  }
}
