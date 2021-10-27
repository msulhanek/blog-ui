import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPayload} from './login-payload';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  message: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }
  get username(){
    return this.loginForm.get('username');
  }

  ngOnInit(): void {
  }

  submit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe( data => {
      if (data){
        console.log('login success');
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log('login failed', error);
      this.message = true;
      this.loginForm.reset();
    });
  }
}
