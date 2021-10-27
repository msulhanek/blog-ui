import { Component, OnInit } from '@angular/core';
import {PostPayload} from '../post-create/post-payload';
import {ActivatedRoute, Router} from '@angular/router';
import {PostCreateService} from '../post-create.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageService} from '../image/image.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.sass']
})
export class PostEditComponent implements OnInit {
  post: PostPayload;
  editPostForm: FormGroup;
  permaLink: number;
  selectedFile: any;
  uploadedNewFile: boolean;
  file: boolean;

  constructor(private actRouter: ActivatedRoute,
              private postService: PostCreateService,
              private router: Router,
              private imageService: ImageService) {
    this.file = true;
    this.actRouter.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      this.editPostForm = new FormGroup({
        title: new FormControl(data.title, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        content: new FormControl(data.content, [Validators.required, Validators.minLength(5)]),
        titleImg: new FormControl(data.titleImg),
      });
    }, (err: any) => {
      console.log('Failure Response', err);
    });

  }

  ngOnInit(): void {

  }

  submit() {
    if (this.uploadedNewFile === true){
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.post.titleImg = this.selectedFile.name;

      this.imageService.addImage(uploadImageData).subscribe(() => {
        console.log('File upload');
      }, error => {
        console.log('Failed to upload', error);
      });
    }

    this.post.title = this.editPostForm.get('title').value;
    this.post.content = this.editPostForm.get('content').value;


    this.postService.editPost(this.permaLink, this.post).subscribe(() => {
      this.router.navigateByUrl('/posts');
    }, error => {
      console.log('Failure Response', error);
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.type);
    if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/jpg'
      || this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpg'){
      this.file = true;
      this.uploadedNewFile = true;
    }
    else{
      this.selectedFile = null;
      this.file = false;
    }
  }
}
