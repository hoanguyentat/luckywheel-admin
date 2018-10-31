import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { MyMessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private toastr: ToastrService, private messageService: MyMessageService) { }

  public log(message: string) {
    this.messageService.error(`${message}`);
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error.description); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation}: ${error.description}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
