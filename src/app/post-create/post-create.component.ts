import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostPayload} from './post-payload';
import {PostCreateService} from '../post-create.service';
import {Router} from '@angular/router';
import {ImageService} from '../image/image.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {
  addPostForm: FormGroup;
  postPayload: PostPayload;
  selectedFile: File;
  file: boolean;

  constructor(private postCreateService: PostCreateService,
              private router: Router,
              private imageService: ImageService,
              private localStorageService: LocalStorageService,
              private formBuilder: FormBuilder) {
    this.postPayload = {
      id: '',
      title: '',
      content: '',
      username: '',
      createdAt: '',
      titleImg: '',
    };
    this.file = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  showTitleError(){
    return this.addPostForm.get('title').touched && this.addPostForm.get('title').invalid;
  }

  showFileError(){
    return this.addPostForm.get('file').touched && this.addPostForm.get('file').invalid;
  }

  getBody(){
    return this.addPostForm.get('body');
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.type);
    if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/jpg'
      || this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpg'){
      this.file = true;
    }
    else{
      this.selectedFile = null;
      this.file = false;
    }

  }

  addPost() {

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.imageService.addImage(uploadImageData).subscribe(() => {
      console.log('File upload');
    }, error => {
      console.log('Failed to upload', error);
    });

    this.postPayload.content = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postPayload.titleImg = this.selectedFile.name;
    this.postPayload.username = this.localStorageService.retrieve('username');

    this.postCreateService.addPost(this.postPayload).subscribe(() => {
      this.router.navigateByUrl('/posts');
    }, error => {
      console.log('Failure Response', error);
    });
  }

  private createForm() {
    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      body: ['', [Validators.required, Validators.minLength(5)]],
      file: ['', [Validators.required]]
    });
  }
}
