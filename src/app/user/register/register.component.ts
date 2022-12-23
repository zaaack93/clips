import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}
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

  register() {
    const { email, password } = this.RegisterForm.value;
    const _vm = this;
    this.inSubmission = true;
    this.auth
      .createUserWithEmailAndPassword(email as string, password as string)
      .then(async (userCred) => {
        await _vm.db.collection('users').add({
          name: _vm.name.value,
          email: _vm.email.value,
          age: _vm.age.value,
          phoneNumber: _vm.phoneNumber.value,
        });
        _vm.colorAlert = 'green';
        _vm.showAlert = true;
        _vm.messageAlert = 'The user is create with success';
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        _vm.colorAlert = 'red';
        _vm.showAlert = true;
        if (errorCode == 'auth/weak-password') {
          _vm.messageAlert = 'The password is too weak.';
        } else {
          _vm.messageAlert = errorMessage;
        }
      })
      .finally(() => {
        _vm.inSubmission = false;
      });
  }
}
