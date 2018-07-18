import {Injectable} from '@angular/core';
import {Task} from '../model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {id: 1, title: 'Task 1', done: false},
    {id: 2, title: 'Task 2', done: false},
    {id: 3, title: 'Task 3', done: true},
    {id: 4, title: 'Task 4', done: false}
  ];

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  addTask(task: Task) {
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1
    });
  }

  updateTask(task: Task) {
    const index = this.tasks
      .findIndex((t) => t.id === task.id);
    this.tasks[index] = task;
  }
}
