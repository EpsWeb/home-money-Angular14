import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
