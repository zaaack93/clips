import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalID: string = '';

  constructor(public modal: ModalService) {}

  closeModal() {
    this.modal.toggleModalVisible(this.modalID);
  }
}
