import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    this._router.navigate(['/login']);
  }

}
