import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
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
  sort$: BehaviorSubject<string>;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
      this.sort$.next(this.videoOrder);
    });
    this.initListClips();
  }
  initListClips() {
    this.clipService.getUserClips(this.sort$).subscribe((docs) => {
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
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);

    this.sort$.subscribe(console.log);
  }
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
  async deleteClip(clip: IClip) {
    await this.clipService.deletClip(clip);
    this.initListClips();
  }
}
