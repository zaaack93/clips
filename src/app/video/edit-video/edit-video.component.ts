import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
})
export class EditVideoComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  activeCLip: IClip | null = null;
  @Output() clipUpdate = new EventEmitter();
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    name: this.title,
  });
  colorAlert: string = 'orange';
  showAlert: boolean = false;
  messageAlert: string = '';
  inSubmission: boolean = false;
  constructor(private modal: ModalService, private clipService: ClipService) {}
  ngOnInit(): void {
    this.modal.register('editClipModal');
  }
  //we arnt't able to listen to the property when it change so you add this lifecycle hook
  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeCLip) {
      this.colorAlert = 'orange';
      this.showAlert = false;
      this.messageAlert = '';
      this.inSubmission = false;
      this.title.setValue(this.activeCLip.title);
    }
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClipModal');
  }
  async editClip() {
    try {
      await this.clipService.updateClip(
        this.title.value as string,
        this.activeCLip?.docID as string
      );
      this.showAlert = true;
      this.colorAlert = 'green';
      this.messageAlert = 'Clip successfully updated';
      this.inSubmission = false;
      this.clipUpdate.emit();
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
