import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {EffortsComponent} from './efforts.component';
import {EffortsTimelineComponent} from '../efforts-timeline/efforts-timeline.component';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'mac-duration',
  template: '{{ duration }}'
})
class MockDurationComponent {
  @Input() duration: number;
  @Output() outDurationChange = new EventEmitter<number>();
}

describe('EffortsComponent', () => {
  let fixture: ComponentFixture<EffortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EffortsComponent,
        MockDurationComponent,
        EffortsTimelineComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EffortsComponent);
  }));

  it('should add eight hours correctly', () => {
    // Given
    const hour = 3600000;
    const component = new EffortsComponent();
    component.efforts = {
      estimated: 0,
      effective: 0
    };
    spyOn(component.outEffortsChange, 'emit');

    // When
    component.addEffectiveHours(8);

    // Then
    expect(component.outEffortsChange.emit).toHaveBeenCalledWith({
      estimated: 0,
      effective: hour * 8
    });
  });

  it('should render initial efforts correctly', () => {
    // Given
    const component = fixture.componentInstance;
    component.efforts = {
      estimated: 1,
      effective: 2
    };
    const [estimatedDurationElement, effectiveDurationElement] = fixture.debugElement
      .queryAll(By.directive(MockDurationComponent));

    // When
    fixture.detectChanges();

    // Then
    expect(estimatedDurationElement.nativeElement.textContent).toBe('1');
    expect(effectiveDurationElement.nativeElement.textContent).toBe('2');
  });

  it('should add one day of effective efforts on button click', () => {
    // Given
    const day = 3600000 * 8;
    const component = fixture.componentInstance;
    component.efforts = {
      estimated: 0,
      effective: 0
    };
    const addDayButton = fixture.debugElement
      .queryAll(By.css('button'))[2];
    spyOn(component.outEffortsChange, 'emit');

    // When
    addDayButton.triggerEventHandler('click', null);

    // Then
    expect(component.outEffortsChange.emit).toHaveBeenCalledWith({
      estimated: 0,
      effective: day
    });
  });
});
