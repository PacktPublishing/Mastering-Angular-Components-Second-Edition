import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task} from './model';

export class Database implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {id: 1, title: 'Task 1', done: false},
      {id: 2, title: 'Task 2', done: false},
      {id: 3, title: 'Task 3', done: true},
      {id: 4, title: 'Task 4', done: false}
    ];
    return {tasks};
  }
}
