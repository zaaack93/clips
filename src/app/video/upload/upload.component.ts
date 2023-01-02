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
  colorAlert: string = '';
  showAlert: boolean = false;
  messageAlert: string = "Please wait! Your clip is being uploaded.";
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

  async uploadFile(){
    this.showAlert = false;
    this.inSubmission = true;
    try {
      const filePath=`clips/${uuidv4()}.mp4`
      await this.storage.upload(filePath,this.file)
      this.showAlert = true;
      this.colorAlert = 'green';
      this.messageAlert = 'File successfully uploaded';
      this.inSubmission = false;
    } catch (e) {
      console.log(e);
      this.showAlert = true;
      this.colorAlert = 'red';
      this.messageAlert =
        'an unexpected error has occurred please try again later ';
      this.inSubmission = false;
    }
  }
}
