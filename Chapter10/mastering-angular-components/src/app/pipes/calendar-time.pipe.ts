import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'calendarTime'
})
export class CalendarTimePipe implements PipeTransform {
  transform(value: any) {
    return moment(value).calendar();
  }
}
