import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  public info(message) {
    this.toastr.info(message);
  }

  public error(message) {
    this.toastr.error(message);
  }
}
