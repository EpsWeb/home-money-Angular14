import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.servive';
import {Message} from '../../shared/models/message.model';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any;
  message: Message = new Message('danger', '');

  constructor(public usersService: UsersService, private _authService: AuthService, private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this._route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this._showMessage('Now you can enter to system', 'success')
        } else if (params['accessDenied']) {
          this._showMessage('For work you need to enter to system', 'warning')
        }
      })

    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(): void {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User | undefined) => {
        console.log(user);
        if (user) {
          if (user.password === formData.password) {
            // logic
            this.message.text = ''
            localStorage.setItem('user', JSON.stringify(user))
            this._authService.login()
            this._router.navigate(['/system', 'bill'])
          } else {
            this._showMessage('Password is not correct')
          }

        } else {
          this._showMessage('No user')
        }
      });
  }

  private _showMessage(text: string, type: string = 'danger'): void {

    this.message = new Message(type, text)
    setTimeout(() => {
      this.message.text = '';
    }, 5000)

  }

}
