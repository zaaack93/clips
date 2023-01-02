import { ClipService } from './../../services/clip.service';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { last, Observable } from 'rxjs';
import { stringify, v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  isDragOver!:boolean;
  file!:File | null;
  nextStep:boolean=false;
  inSubmission: boolean = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup(
    {
      name: this.title,
  })
  percentage:number=0;
  colorAlert: string = '';
  showAlert: boolean = false;
  messageAlert: string = "Please wait! Your clip is being uploaded.";
  user:firebase.User | null=null;
  constructor(private storage:AngularFireStorage,private auth:AngularFireAuth,private clipService:ClipService){
    auth.user.subscribe(user=>{
      this.user=user;
    })
  }
  storeFile($event:Event){
    this.isDragOver=false;
    this.file=($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    console.log(this.file)
    if(!this.file || this.file.type!=="video/mp4"){
      return
    }
    this.nextStep=true;
  }

  async uploadFile(){
    let _vm=this;
    this.showAlert = false;
    this.inSubmission = true;
    const filePath=`clips/${uuidv4()}.mp4`
    const task = this.storage.upload(filePath,this.file);
    //ref is an object that points to a specific file
    const clipRef = this.storage.ref(filePath);
    task.percentageChanges().subscribe(progress=>{
      this.percentage=progress as number;
    })

    task.snapshotChanges().pipe(last(),
    switchMap(()=>clipRef.getDownloadURL())
    ).subscribe({
      next(url){
        const clip ={
          uid:_vm.user?.uid as string,
          displayName:_vm.user?.displayName as string,
          title:_vm.title.value as string,
          fileName:`${filePath.replace('clips/','')}`,
          url:url
        }
        _vm.clipService.createClip(clip)
        console.log(url)
        _vm.showAlert = true;
        _vm.colorAlert = 'green';
        _vm.messageAlert = 'Your clip is now ready to share';
        _vm.inSubmission = false;
      },
      error(error){
        _vm.showAlert = true;
        _vm.colorAlert = 'red';
        _vm.messageAlert = 'an unexpected error has occurred please try again later ';
        _vm.inSubmission = false;
      }
    })
  }
}
