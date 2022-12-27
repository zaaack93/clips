import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afauth: AngularFireAuth,
    private router:Router
  ) {}
  openModal(event: Event) {
    event.preventDefault();
    this.modal.toggleModalVisible('auth');
  }
  async logout(event: Event) {
    event.preventDefault();
    await this.afauth.signOut();
    await this.router.navigateByUrl('/')
  }
}
