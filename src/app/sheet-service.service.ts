import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanInfo } from './loan-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SheetServiceService {

  private realEstateUrl: string;
 
  constructor(private http: HttpClient) {
    this.realEstateUrl = environment.springBootBase+environment.postLoans;
  }

  public saveAll(user: LoanInfo[]) {
    return this.http.post<LoanInfo>(this.realEstateUrl, user);
  }
}
