import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, Subscription } from 'rxjs';
import { API_URL } from '../config/config';
import { Bank } from '../model/bank.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  // Subject for emitting changes on bank table
  public data$: Subject<Bank[]>;

  constructor(private http: HttpClient) {
    this.data$ = new Subject<Bank[]>();
  }

  /**
   * HttpClient captures errors in its HttpErrorResponse and then is handled in this method
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred on the front-side:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `Message: ${error.error.description}`);
    }
    return throwError('Something bad happened; please try again later.');
  }


  /**
   * GET: gets all banks in an array
   */
  getAllBanks(): Observable<Bank[]> {
    const url = `${API_URL}/api/Bank/GetAll`;
    return this.http.get<Bank[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * addBank()
   * POST: add a new bank in the database
   */
  createNewBank(bankName: string): Observable<any> {
    const url = `${API_URL}/api/Bank/Insert`;
    let bank = new Bank(bankName);
    console.log(bank);
    return this.http.post(url, bank)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * UPDATE: updates a bank record in the database
   */
  updateBank(bank: Bank): Observable<any> {
    const url = `${API_URL}/api/Bank/Update`;
    return this.http.put(url, bank)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  /**
   * DELETE: logical delete in database
   */
  deleteBank(id: number): Observable<any> {
    const url = `${API_URL}/api/Bank/Remove/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * Getter for data Subject
   */
  getData$(): Observable<Bank[]> {
    return this.data$.asObservable();
  }

  
  /**
   * Subject emits new modification alert
   * @param data Array of current banks
   */
  private emit(data: Bank[]): void {
    this.data$.next(data);
  }

  /**
   * Refreshes the Bank datatable
   * @returns A reference to the subscription
   */
  updateTable(): Subscription {
    return this.getAllBanks().subscribe(currentBanks => {
      this.emit(currentBanks);
    });
  }
  

}
