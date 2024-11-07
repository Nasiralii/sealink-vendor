import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss']
})
export class NoDataFoundComponent {
  @Input() message: any='No Records Found!';
  
  customMsg:any=this.message!=null?this.message:'No Records Found!';
}
