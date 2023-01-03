import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  listClips: IClip[] = [];
  activeClip: IClip | null = null;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
    });
    this.initListClips();
  }
  initListClips() {
    this.clipService.getUserClips().subscribe((docs) => {
      this.listClips = [];

      docs.forEach((doc) => {
        this.listClips.push({ docID: doc.id, ...doc.data() });
      });
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService
  ) {}
  sortChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: this.videoOrder,
      },
    });
  }
  editClip(clip: IClip) {
    this.activeClip = clip;
    this.modal.toggleModalVisible('editClipModal');
  }
  upldateListClip() {
    this.initListClips();
    this.modal.toggleModalVisible('editClipModal');
  }
}
