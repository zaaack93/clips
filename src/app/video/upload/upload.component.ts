import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  isDragOver!:boolean;
  file!:File | null;
  nextStep:boolean=false;
  storeFile($event:Event){
    this.isDragOver=false;
    this.file=($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    console.log(this.file)
    if(!this.file || this.file.type!=="video/mp4"){
      return
    }
    this.nextStep=true;
  }
}
