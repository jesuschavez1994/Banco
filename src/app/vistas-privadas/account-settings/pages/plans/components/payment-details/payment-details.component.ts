import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';
import { BROWSER_STORAGE } from '@app/browserStorage';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  @Input() voucherDetails: object;
  @Output() pageChange: EventEmitter<string>;

  nextPage = 'plans';

  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  constructor(@Inject(BROWSER_STORAGE) private localStorage: Storage) {
    this.pageChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    // Since the order was processed, we clear the value.
    this.localStorage.removeItem('createdOrderDetails');
    console.log(`Details of the voucher: ${this.voucherDetails}`);
  }
}
