import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../Models/User';
import { LoggerService } from './logger.service';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class UserService {
  users: User[] = [
    new User('Steve Smith', 'Male', 'Monthly', 'Active'),
    new User('Mark Jone', 'Female', 'Yearly', 'Active'),
    new User('Steve Mark', 'Male', 'Quaterly', 'Inactive'),
  ];

  constructor(private logger: LoggerService) {}

  OnshowUserDetailsClicked: EventEmitter<User> = new EventEmitter<User>();

  OnShowUserDetails(user: User) {
    this.OnshowUserDetailsClicked.emit(user);
  }

  GetAllUsers() {
    return this.users;
  }

  CreateUser(name: string, gender: string, subType: string, status: string) {
    let user = new User(name, gender, subType, status);

    this.users.push(user);

    this.logger.LogMessage(name, status);
  }
}
