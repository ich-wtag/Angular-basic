import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/Models/User';
import { USER_TOKEN } from 'src/app/app.module';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  selectedUser!: User;
  userService = inject(USER_TOKEN);

  ngOnInit(): void {
    this.userService.OnshowUserDetailsClicked.subscribe((data: User) => {
      this.selectedUser = data;
    });
  }
}
