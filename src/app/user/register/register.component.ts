import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
    ),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  RegisterForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });
  colorAlert: string = '';
  showAlert: boolean = false;
  messageAlert: string = "Please wait! You're account is being created.";
  inSubmission: boolean = false;

  async register() {
    this.showAlert = false;
    this.inSubmission = true;
    try {
      await this.auth.createUser(this.RegisterForm.value);
      this.showAlert = true;
      this.colorAlert = 'green';
      this.messageAlert = 'user successfully registered';
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
