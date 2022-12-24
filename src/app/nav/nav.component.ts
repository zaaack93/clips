import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAuthenticated: boolean = false;
  constructor(public modal: ModalService, public auth: AuthService) {
    auth.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }
  openModal(event: Event) {
    event.preventDefault();
    this.modal.toggleModalVisible('auth');
  }
}
