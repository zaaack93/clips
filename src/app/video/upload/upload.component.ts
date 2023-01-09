import { ClipService } from './../../services/clip.service';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest, forkJoin, last } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FfmpegService } from 'src/app/services/ffmpeg.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnDestroy {
  isDragOver!: boolean;
  file!: File | null;
  nextStep: boolean = false;
  inSubmission: boolean = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup({
    name: this.title,
  });
  percentage: number = 0;
  colorAlert: string = '';
  showAlert: boolean = false;
  messageAlert: string = 'Please wait! Your clip is being uploaded.';
  user: firebase.User | null = null;
  task!: AngularFireUploadTask;
  screenShotTask!: AngularFireUploadTask;
  screenShots: string[] = [];
  selectedScreenShot: string = '';
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
    this.ffmpegService.init();
  }
  async storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.screenShots = await this.ffmpegService.getScreenShoots(this.file);
    this.selectedScreenShot = this.screenShots[0];
    this.nextStep = true;
  }

  async uploadFile() {
    let _vm = this;
    this.showAlert = false;
    this.inSubmission = true;
    const filePath = `clips/${uuidv4()}.mp4`;
    this.task = this.storage.upload(filePath, this.file);
    //get the blob from url
    const screenShotBlob = this.ffmpegService.getBlobFromUrl(
      this.selectedScreenShot
    );
    const screenShotPath = `screenShots/${uuidv4()}.png`;

    this.screenShotTask = this.storage.upload(screenShotPath, screenShotBlob);
    const screenRef = this.storage.ref(screenShotPath);
    //ref is an object that points to a specific file
    const clipRef = this.storage.ref(filePath);
    combineLatest([
      this.task.percentageChanges(),
      this.screenShotTask.percentageChanges(),
    ]).subscribe((progress) => {
      const [progressVideo, progressScreenShot] = progress;
      if (!progressVideo || !progressScreenShot) return;
      this.percentage = progressVideo + progressScreenShot;
    });
    forkJoin([
      this.task.snapshotChanges(),
      this.screenShotTask.snapshotChanges(),
    ])
      .pipe(
        switchMap(() =>
          forkJoin([clipRef.getDownloadURL(), screenRef.getDownloadURL()])
        ),
        map(([clipUrl, screenUrl])=>(
            {
            uid: _vm.user?.uid as string,
            displayName: _vm.user?.displayName as string,
            title: _vm.title.value as string,
            fileName: `${filePath.replace('screenShots/', '')}`,
            url: clipUrl,
            screenShotUrl: screenUrl,
            screenName: `${screenShotPath.replace('clip/', '')}`,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
          ))
      )
      .subscribe({
        async next(clip) {

          const clipDocRef = await _vm.clipService.createClip(clip);
          _vm.showAlert = true;
          _vm.colorAlert = 'green';
          _vm.messageAlert = 'Your clip is now ready to share';
          _vm.inSubmission = false;
          setTimeout(() => {
            _vm.router.navigate(['clip', clipDocRef.id]);
          }, 1000);
        },
        error(error) {
          _vm.showAlert = true;
          _vm.colorAlert = 'red';
          _vm.messageAlert =
            'an unexpected error has occurred please try again later ';
          _vm.inSubmission = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.task?.cancel();
  }
}
