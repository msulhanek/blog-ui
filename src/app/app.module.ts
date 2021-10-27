import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {EditorModule} from '@tinymce/tinymce-angular';
import {HttpClientInterceptor} from './auth/http-client-interceptor';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatInputModule} from '@angular/material/input';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentGetComponent } from './comment-get/comment-get.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    UsersComponent,
    PostDetailComponent,
    PostManageComponent,
    LoginComponent,
    RegisterComponent,
    PostEditComponent,
    UserEditComponent,
    PostCreateComponent,
    PageNotFoundComponent,
    UserDetailComponent,
    CommentAddComponent,
    CommentGetComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        NgxWebstorageModule.forRoot(),
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        EditorModule,
        MatInputModule
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule{
}
