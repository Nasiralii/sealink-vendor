import { Component, Input, OnInit, SimpleChanges, DoCheck, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, DoCheck {

  @Input() control: any;
  @Input() submitted: boolean;
  @Input() fieldName: boolean;
  @Input() errMsg: any = '';

  errorMessages = {
    required: 'Required',
    // pattern: 'Invalid pattern',
    max: 'Maximum allowed value ##Value##',
    min: 'Minimum required value ##Value##',
    maxlength: 'Maximum ##Value## characters allowed',
    minlength: 'Minimum ##Value## characters required',
    cutOffMarks: 'Cut off marks should be less than total marks',
    cutOffDiffMarks: 'Cut off difference should be less than ',
    emailTaken: 'Email Alreay Exists',
    email: 'Invalid email'
  };

  message: any = '';
  
  keys = [];

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.setMessage();
  }

  setMessage() {
    this.setKeys();
    if (this.keys.length > 0) {
      if (['maxlength', 'minlength'].includes(this.keys[0])) {
        this.setMaxMinLengthMsg(this.keys[0]);
      } else if (['max', 'min'].includes(this.keys[0])) {
        this.setMaxMinMsg(this.keys[0]);
      } else if (['pattern'].includes(this.keys[0])) {
        this.message = this.errMsg;
      }  else {
        this.message = this.errorMessages[this.keys[0]];
      }
    } else {
      this.message = '';
    }
  }

  setKeys() {
    if (this.control.errors) {
      this.keys = Object.keys(this.control.errors);
    } else {
      this.keys = [];
    }
  }

  setMaxMinLengthMsg(key) {
    try {
      this.message = this.errorMessages[this.keys[0]].replace('##Field##', this.fieldName)
                    .replace('##Value##', `${this.control.errors[key].requiredLength}`);
    } catch (err) {}
  }

  setMaxMinMsg(key) {
    try {
      this.message = this.errorMessages[this.keys[0]].replace('##Field##', this.fieldName)
                    .replace('##Value##', `${this.control.errors[key][key]}`);
    } catch (err) {}
  }

}
