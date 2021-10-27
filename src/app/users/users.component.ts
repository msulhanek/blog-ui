import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {UserPayload} from './user-payload';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users: UserPayload[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }

  private loadData() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}
