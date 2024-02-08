import { Component, Inject } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { USER_TOKEN } from 'src/app/app.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  userList = this.userService.GetAllUsers();

  showUserDetails(user: User) {
    this.userService.OnShowUserDetails(user);
  }
}
