import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanUserPage } from './scan-user.page';

describe('ScanUserPage', () => {
  let component: ScanUserPage;
  let fixture: ComponentFixture<ScanUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
