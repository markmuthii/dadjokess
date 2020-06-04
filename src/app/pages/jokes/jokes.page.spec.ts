import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JokesPage } from './jokes.page';

describe('JokesPage', () => {
  let component: JokesPage;
  let fixture: ComponentFixture<JokesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JokesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
