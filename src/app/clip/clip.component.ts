import videojs from 'video.js';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) targer?: ElementRef;
  player?: videojs.Player;
  clip?: IClip;
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.targer?.nativeElement);
    this.route.data.subscribe((data) => {
      this.clip = data['clip'] as IClip;
      this.player?.src({
        src: this.clip.url,
        type: 'Video/mp4',
      });
    });
  }
  //ngafter init is run if the template is ready so you can use the view child for HTML elements in this function
}
