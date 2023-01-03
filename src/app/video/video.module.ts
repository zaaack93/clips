import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditVideoComponent } from './edit-video/edit-video.component';


@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    EditVideoComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VideoModule { }
