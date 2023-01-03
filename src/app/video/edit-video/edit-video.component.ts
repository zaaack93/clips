import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
})
export class EditVideoComponent implements OnInit, OnDestroy {
  @Input()
  activeCLip: IClip | null = null;
  constructor(private modal: ModalService) {}
  ngOnInit(): void {
    this.modal.register('editClipModal');
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClipModal');
  }
}
