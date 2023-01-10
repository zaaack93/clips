import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {
  id='';
  @ViewChild('videoPlayer',{static:true}) targer?: ElementRef;
  constructor(public route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => console.log(params['id']))
  }
  //ngafter init is run if the template is ready so you can use the view child for HTML elements in this function
  ng
}
