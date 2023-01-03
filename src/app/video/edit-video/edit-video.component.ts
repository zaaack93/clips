import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css'],
})
export class EditVideoComponent implements OnInit, OnDestroy {
  constructor(private modal: ModalService) {}
  ngOnInit(): void {
    this.modal.register('editClipModal');
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClipModal');
  }
}
