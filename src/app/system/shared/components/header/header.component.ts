import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {User} from '../../../../shared/models/user.model';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(public _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this._authService.logout()
    this._router.navigate(['/login'])
  }

}
