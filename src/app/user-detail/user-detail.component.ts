import { Component, OnInit } from '@angular/core';
import {UserService} from '../users/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserPayload} from '../users/user-payload';
import {PostPayload} from '../post-create/post-payload';
import {PostCreateService} from '../post-create.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  user: UserPayload;
  posts: Observable<Array<PostPayload>>;
  usernameLink: string;
  constructor(private userService: UserService, private router: ActivatedRoute, private postService: PostCreateService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.usernameLink = params.username;
    });

    this.userService.getUser(this.usernameLink).subscribe((data: UserPayload) => {
      this.user = data;
      this.posts = this.postService.getUserPosts(data.username);
    }, (err: any) => {
      console.log('Failure Response User', err);
    });


  }

  format(registerDate: string) {
    return new Date((parseInt(registerDate) * 1000)).toLocaleString();
  }
}
