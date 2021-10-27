import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterPayload} from './register-payload';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {LoginPayload} from '../login/login-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  loginPayload: LoginPayload;
  usernameTaken: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      surename: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.registerPayload = {
      name: '',
      surename: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  getname(){
    return this.registerForm.get('name');
  }

  getsurename(){
    return this.registerForm.get('surename');
  }

  getEmail(){
    return this.registerForm.get('email');
  }

  getUsername(){
    return this.registerForm.get('username');
  }

  getPassword(){
    return this.registerForm.get('password');
  }

  getConfirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  submit() {
    this.registerPayload.name = this.registerForm.get('name').value;
    this.registerPayload.surename = this.registerForm.get('surename').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.loginPayload.username = this.registerForm.get('username').value;
    this.loginPayload.password = this.registerForm.get('password').value;

    this.authService.register(this.registerPayload).subscribe(() => {
      console.log('register succes');
      this.authService.login(this.loginPayload).subscribe( data => {
        if (data){
          console.log('login success');
          this.router.navigateByUrl('posts');
        }
        else {
          console.log('login failed');
        }
      });
    }, error => {
      this.usernameTaken = true;
      console.log(error);
    });
  }

  controllPassword() {
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    return password === confirmPassword;
  }
}
