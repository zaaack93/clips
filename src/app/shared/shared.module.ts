import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { ContainerTabsComponent } from './container-tabs/container-tabs.component';

@NgModule({
  declarations: [ModalComponent, TabComponent, ContainerTabsComponent],
  imports: [CommonModule],
  exports: [ModalComponent, TabComponent, ContainerTabsComponent],
})
export class SharedModule {}
