import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {UserPayload} from './user-payload';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users: Observable<Array<UserPayload>>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }

  format(createdAt: string) {
    return new Date((parseInt(createdAt) * 1000)).toLocaleString();
  }
}
