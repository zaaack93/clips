import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTabsComponent } from './container-tabs.component';

describe('ContainerTabsComponent', () => {
  let component: ContainerTabsComponent;
  let fixture: ComponentFixture<ContainerTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
