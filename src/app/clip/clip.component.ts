import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {
  id='';
  constructor(public route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => console.log(params['id']))
  }
}
