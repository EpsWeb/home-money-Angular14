import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, forkJoin, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private _billService: BillService) { }

  bill?: Bill;
  currency: any;
  isLoaded = false;
  sub1?: Subscription;
  sub2?: Subscription;

  ngOnInit(): void {
    this.sub1 = combineLatest(
      this._billService.getBill(),
      this._billService.getCurrency()
    )
   .subscribe((data: [Bill, any]) => {
     console.log(data);
     this.bill = data[0]
     this.currency = data[1]
     this.isLoaded = true
   })
  }

  ngOnDestroy() {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  onRefresh(): void {
    this.isLoaded = false
    this.sub2 = this._billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency
        this.isLoaded = true
      })
  }

}
