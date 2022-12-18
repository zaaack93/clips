import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { ContainerTabsComponent } from './container-tabs/container-tabs.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    ContainerTabsComponent,
    InputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [
    ModalComponent,
    TabComponent,
    ContainerTabsComponent,
    InputComponent,
  ],
})
export class SharedModule {}
