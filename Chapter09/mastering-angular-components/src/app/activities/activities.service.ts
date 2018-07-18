import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Activity, ProjectActivity, User} from '../model';
import {UserService} from '../user/user.service';
import {map, mergeMap, take} from 'rxjs/operators';

@Injectable()
export class ActivitiesService {
  private activities = new BehaviorSubject<Activity[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {
    this.loadActivities();
  }

  private loadActivities() {
    this.http.get<Activity[]>('/api/activities')
      .subscribe((activities) => this.activities.next(activities));
  }

  getActivities() {
    return this.activities
      .asObservable().pipe(
        map(activities => activities.sort((a, b) => b.time - a.time))
      );
  }

  logProjectActivity(projectId: number, category: string, title: string, message: string) {
    this.userService.getCurrentUser()
      .pipe(
        take(1),
        mergeMap((user: User) => this.http
          .post('/api/activities', <ProjectActivity>{
            kind: 'project',
            time: +new Date(),
            projectId,
            user,
            category,
            title,
            message
          })
        )
      ).subscribe(() => this.loadActivities());
  }
}
