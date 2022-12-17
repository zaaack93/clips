import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-container-tabs',
  templateUrl: './container-tabs.component.html',
  styleUrls: ['./container-tabs.component.css'],
})
export class ContainerTabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  //we use this instead of init because we want the content tabs initialised
  ngAfterContentInit(): void {
    //for the first cas we need to set an active tab for default ? is option if

    var activeTabs = this.tabs?.filter((tab) => tab.active);

    if (!activeTabs || activeTabs.length === 0) {
      // ! we have confident this propertie will have at least one item
      this.setActiveTab(this.tabs!.first);
    }
  }

  setActiveTab(tab: TabComponent) {
    //set all the tabs inactive
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    //set the prevent default behaviour to false
    return false;
  }
}
