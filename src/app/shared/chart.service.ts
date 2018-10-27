import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMonthlyData } from './montlydata.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  // getChartData(query: any): Observable<any[]> {
  //   const param1 = `filter[where][date][between][0]=${query.firstDay}`;
  //   const param2 = `&filter[where][date][between][1]=${query.lastDay}`;
  //   const param3 = `&filter[fields][date]=true`;
  //   const param4 = `&filter[fields][price]=true`;
  //   const param5 = `&filter[order]=date ASC`;

  //   return this.http.get<any[]>(`${ this.baseUrl }/expenses?${param1}${param2}${param3}${param4}${param5}`, this.getHeaders());
  // }

  getChartData(): Observable<IMonthlyData[]> {

    return this.http.get<IMonthlyData[]>(`${ this.baseUrl }/expenses/spending`, this.getHeaders());
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders
      (
        { 'Content-Type': 'application/json' }
      )
    };
    return httpOptions;
  }
}
