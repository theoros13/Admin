import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtracPage } from './extrac.page';

describe('ExtracPage', () => {
  let component: ExtracPage;
  let fixture: ComponentFixture<ExtracPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtracPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtracPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
