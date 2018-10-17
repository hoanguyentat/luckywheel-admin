import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  constructor(private toastr: ToastrService) { }

  public info(message) {
    this.toastr.info(message);
  }

  public error(message) {
    this.toastr.error(message);
  }

  public warning(message) {
    this.toastr.warning(message);
  }


   // send an object to app component

  sendMessage(message: boolean) {
    this.subject.next({ userStatus: message });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}
