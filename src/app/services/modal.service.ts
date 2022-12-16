import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private visible: Boolean = false;
  constructor() {}

  toggleModalVisible() {
    this.visible = !this.visible;
  }
  isModalVisible() {
    return this.visible;
  }
}
