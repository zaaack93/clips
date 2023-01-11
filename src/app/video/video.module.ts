import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    EditVideoComponent,
    SafeUrlPipe,
  ],
  imports: [
    ClipboardModule,
    CommonModule,
    VideoRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class VideoModule {}
