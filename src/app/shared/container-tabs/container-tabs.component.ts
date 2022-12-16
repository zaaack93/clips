import { Component, ContentChildren, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-container-tabs',
  templateUrl: './container-tabs.component.html',
  styleUrls: ['./container-tabs.component.css'],
})
export class ContainerTabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs = {};

  //we use this instead of init because we want the content tabs initialised
  ngAfterContentInit(): void {
    console.log(this.tabs);
  }
}
