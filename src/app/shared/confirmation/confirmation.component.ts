import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText = 'OK';
  @Input() btnCancelText = 'CANCEL';
  @Input() show = false;
  @Input() width = '350px';

  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  decline() {
    this.confirm.emit(false);
    this.show = false;
  }

  accept() {
    this.confirm.emit(true);
    this.show = false;
  }

}
