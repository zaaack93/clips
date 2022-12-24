import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  colorAlert: string = '';
  showAlert: boolean = false;
  messageAlert: string = 'Please wait!';
  inSubmission: boolean = false;

  constructor(private auth: AngularFireAuth) {}
  credantials = {
    email: '',
    password: '',
  };
  async SubmitForm(f: NgForm) {
    this.showAlert = false;
    this.inSubmission = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credantials.email,
        this.credantials.password
      );
      this.showAlert = true;
      this.colorAlert = 'green';
      this.messageAlert = "You're successfully logged in";
      this.inSubmission = false;
    } catch (e) {
      console.log(e);
      this.showAlert = true;
      this.colorAlert = 'red';
      this.messageAlert =
        'an unexpected error has occurred please try again later ';
      this.inSubmission = false;
    }
  }
}
