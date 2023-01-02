import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
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
  constructor(private storage:AngularFireStorage){}
  storeFile($event:Event){
    this.isDragOver=false;
    this.file=($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    console.log(this.file)
    if(!this.file || this.file.type!=="video/mp4"){
      return
    }
    this.nextStep=true;
  }

  uploadFile(){
    console.log("file upload")
    const filePath=`clips/${uuidv4()}.mp4`
    this.storage.upload(filePath,this.file)
  }
}
