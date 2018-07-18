import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Project} from '../model';

@Injectable()
export class ProjectService {
  private projects = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  private loadProjects() {
    this.http.get<Project[]>('/api/projects')
      .subscribe((projects) => this.projects.next(projects));
  }

  getProjects() {
    return this.projects.asObservable();
  }

  updateProject(project: Project) {
    this.http.post(`/api/projects/${project.id}`, project)
      .subscribe(() => this.loadProjects());
  }
}
