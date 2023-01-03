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
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
})
export class EditVideoComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  activeCLip: IClip | null = null;
  title = new FormControl(this.activeCLip?.title, [
    Validators.required,
    Validators.minLength(3),
  ]);
  editForm = new FormGroup({
    name: this.title,
  });
  inSubmission: boolean = false;
  constructor(private modal: ModalService) {}
  ngOnInit(): void {
    this.modal.register('editClipModal');
  }
  //we arnt't able to listen to the property when it change so you add this lifecycle hook
  ngOnChanges(changes: SimpleChanges): void {
    if (this.activeCLip) {
      this.title.setValue(this.activeCLip.title);
    }
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClipModal');
  }
  editClip() {}
}
