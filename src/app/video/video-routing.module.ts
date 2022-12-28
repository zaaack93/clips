import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToLogin
    },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToLogin
    },
    canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
