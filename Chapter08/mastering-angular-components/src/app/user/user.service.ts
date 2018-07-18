import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }

  getCurrentUser() {
    return this.http.get<User>('/api/users/1');
  }
}
