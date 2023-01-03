import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params)=>{
      this.videoOrder=params['sort']==='2' ? params['sort'] : '1'
    })

    this.clipService.getUserClips().subscribe(console.log)
  }
  constructor(private router :Router,private route:ActivatedRoute,private clipService:ClipService){}
  sortChange(){
    this.router.navigate([],
    {
      relativeTo:this.route,
      queryParams:{
        sort:this.videoOrder
      }
    })
  }
}
