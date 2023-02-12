import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {WfmEvent} from '../../shared/models/event.model';
import * as moment from 'moment'
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {mergeMap} from 'rxjs';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() categories?: Category[];
  types = [
    {
      type: 'income',
      label: 'Доход'
    },

    {
      type: 'outcome',
      label: 'Расход'
    }
  ]

  message = new Message('danger', '')

  constructor(private eventsService: EventsService, private billService: BillService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    const {amount, description, category, type} = form.value

    const date = moment().format('DD.MM.YYYY HH:mm:ss')

    const event = new WfmEvent(type, amount, +category, date, description)

    this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (event.type == 'outcome') {
          if (amount > bill.value) {
            // 'Error'
            this.showMessage(`No enough money on bill. Need ${amount - bill.value}`)
            return
          } else {
            value = bill.value - amount
          }
        } else {
          value = bill.value + amount
        }

        this.billService.updateBill({value, currency: bill.currency})
          .pipe(
            mergeMap(() => this.eventsService.addEvent(event))
          )
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: '',
              category: 1,
              type: 'outcome'
            })
          })
      })

    // this.eventsService.addEvent(event)
  }

  private showMessage(text: string) {
    this.message.text = text
    setTimeout(() => {
      this.message.text = ''
    }, 3000)
  }
}
