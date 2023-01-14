import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have .hidden class', () => {
    //angular version of the template it's independent of any platform
    const element = fixture.debugElement.query(By.css('.hidden'));
    // expose the template via the browser DOM Api
    //const element1 = fixture.nativeElement.querySelector();
    expect(element).toBeTruthy();
  });

  it('should not have .hidden class', () => {
    component.active = true;
    //detect changes it's for apply the reloading the new DOM after changing componoing properties
    fixture.detectChanges();
    //angular version of the template it's independent of any platform
    const element = fixture.debugElement.query(By.css('.hidden'));
    // expose the template via the browser DOM Api
    //const element1 = fixture.nativeElement.querySelector();
    //its the same of !tobetruthy or tobefalsy
    expect(element).not.toBeTruthy();
  });
});
