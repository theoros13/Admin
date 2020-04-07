import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifiUserPage } from './modifi-user.page';

describe('ModifiUserPage', () => {
  let component: ModifiUserPage;
  let fixture: ComponentFixture<ModifiUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
