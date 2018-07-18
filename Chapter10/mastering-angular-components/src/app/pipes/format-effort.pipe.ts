import {Pipe, PipeTransform} from '@angular/core';
import {formatDuration} from '../utilities/time-utilities';
import {TimeEfforts} from '../model';

@Pipe({
  name: 'formatEfforts'
})
export class FormatEffortsPipe implements PipeTransform {
  transform(value: TimeEfforts) {
    if (value == null || typeof value !== 'object') {
      return value;
    }

    return `${formatDuration(value.effective) || 'none'} of ${formatDuration(value.estimated) || 'not estimated'}`;
  }
}
