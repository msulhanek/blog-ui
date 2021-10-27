import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PostManageComponent} from './post-manage/post-manage.component';
import {AuthGuard} from './auth.guard';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {CommentAddComponent} from './comment-add/comment-add.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'posts/new', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'posts/manage', component: PostManageComponent, canActivate: [AuthGuard]},
  {path: 'posts/:id', component: PostDetailComponent, canActivate: [AuthGuard]},
  {path: 'posts/:id/add', component: CommentAddComponent, canActivate: [AuthGuard]},
  {path: 'posts/:id/edit', component: PostEditComponent, canActivate: [AuthGuard]},

  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users/settings', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'users/:username', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
