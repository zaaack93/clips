import { DatePipe } from '@angular/common';
import { ClipService } from 'src/app/services/clip.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input()
  scrollable:boolean=true;
  constructor(public clipService:ClipService){
    this.clipService.getClipsList();
  }
  ngOnInit(): void {
    if(this.scrollable)
    document.addEventListener('scroll', this.handleScroll);
  }
  ngOnDestroy(): void {
    if(this.scrollable)
    document.removeEventListener('scroll', this.handleScroll);

    this.clipService.clipsList=[];
  }

  handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const bottomOfWindow: boolean =
      innerHeight + Math.round(scrollTop) === offsetHeight;

    if (bottomOfWindow) {
      this.clipService?.getClipsList();
    }
  }
}
