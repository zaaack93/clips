import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() color:string="blue";

  get getColorVariant(){
    return `border-${this.color}-400 text-${this.color}-700 bg-${this.color}-100`
  }
}
