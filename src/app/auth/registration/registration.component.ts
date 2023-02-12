import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.servive';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: any;

  constructor(private _usersService: UsersService, private _router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(null, [Validators.requiredTrue]),
    })
  }

  submit() {
    console.log(this.form.value);
    const formValue = this.form.value;
    const {email, password, name} = formValue;
    const user: User = {email, password, name}
    this._usersService.createNewUser(user)
      .subscribe(() => {
        this._router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      })
  }

  forbiddenEmail(control: AbstractControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this._usersService.getUserByEmail(control.value)
        .subscribe((user: User | undefined) => {
          if (user) {
            resolve({forbiddenEmail: true})
          } else {
            resolve(null)      ;    }
        })
    })
  }

}
