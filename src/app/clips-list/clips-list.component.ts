import { ClipService } from 'src/app/services/clip.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
})
export class ClipsListComponent implements OnInit, OnDestroy {

  constructor(public clipService:ClipService){
    this.clipService.getClipsList();
  }
  ngOnInit(): void {
    document.addEventListener('scroll', this.handleScroll);
  }
  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const bottomOfWindow: boolean =
      innerHeight + Math.round(scrollTop) === offsetHeight;

    if (bottomOfWindow) {
      this.clipService.getClipsList();
    }
  }
}
