import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifEventPage } from './modif-event.page';

describe('ModifEventPage', () => {
  let component: ModifEventPage;
  let fixture: ComponentFixture<ModifEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
