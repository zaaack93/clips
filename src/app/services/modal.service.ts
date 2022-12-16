import { Injectable } from '@angular/core';

interface IModel {
  id: string;
  visible: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModel[] = [];
  constructor() {}

  toggleModalVisible(id: string) {
    const modal = this.modals.find((modal) => modal.id == id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }
  isModalVisible(id: string): Boolean {
    //check if we have an modal after that get the visible attribute
    return Boolean(this.modals.find((modal) => modal.id == id)?.visible);
  }
  register(id: string) {
    this.modals.push({
      id,
      visible: false,
    });
  }
}
