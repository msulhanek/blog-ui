import { Component, OnInit } from '@angular/core';
import {UserPayload} from '../users/user-payload';
import {UserService} from '../users/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {ImageService} from '../image/image.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

  user: UserPayload;
  userEditForm: FormGroup;
  selectedFile: any;
  uploadedNewFile: boolean;
  storeUserName: string;
  file: boolean;
  constructor(private userService: UserService, private localStorageService: LocalStorageService, private imageService: ImageService,
              private router: Router, private authService: AuthService) {
    this.userService.getUser(this.localStorageService.retrieve('username')).subscribe((data: UserPayload) => {
      this.user = data;
      this.storeUserName = data.username;
      this.userEditForm = new FormGroup({
        name: new FormControl(data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        surename: new FormControl(data.surename, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(data.email, [Validators.required, Validators.email]),
        username: new FormControl(data.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
        note: new FormControl(data.note, [Validators.required, Validators.minLength(5)])
      });
    }, (err: any) => {
      console.log('Failure Response User', err);
    });
    this.file = true;
  }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/jpg'
      || this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpg') {
      this.file = true;
      this.uploadedNewFile = true;
    }
    else{
      this.selectedFile = null;
      this.file = false;
    }
  }

  submit() {
    if (this.uploadedNewFile === true){
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.user.profilePicture = this.selectedFile.name;

      this.imageService.addImage(uploadImageData).subscribe(() => {
        console.log('File upload');
      }, error => {
        console.log('Failed to upload', error);
      });
    }

    this.user.name = this.userEditForm.get('name').value;
    this.user.surename = this.userEditForm.get('surename').value;
    this.user.username = this.userEditForm.get('username').value;
    this.user.note = this.userEditForm.get('note').value;

    this.userService.editUser(this.localStorageService.retrieve('username'), this.user).subscribe(() => {
      if (this.storeUserName !== this.user.username){
        this.authService.logout();
      }else{
        this.router.navigateByUrl('/users');
      }
    }, error => {
      console.log('Failure Response', error);
    });
  }
}
