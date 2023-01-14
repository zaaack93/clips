import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTabsComponent } from './container-tabs.component';
import { TabComponent } from '../tab/tab.component';
import { By } from '@angular/platform-browser';

//for dummy component with projection content
@Component({
  template: ` <app-container-tabs>
    <app-tab tabTitle="tab 1">content 1</app-tab>
    <app-tab tabTitle="tab 2"> content 2</app-tab>
  </app-container-tabs>`,
})
class TestHostComponent {}

describe('ContainerTabsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerTabsComponent, TabComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tabs', () => {
    const containerComponant = fixture.debugElement.query(
      By.directive(ContainerTabsComponent)
    );
    const tabsProp = containerComponant.componentInstance.tabs;
    expect(tabsProp.length)
      .withContext('Could not grab component property')
      .toBe(2);
  });
});
