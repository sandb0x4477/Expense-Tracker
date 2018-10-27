import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IExpense } from './expense.model';
import { LazyLoadEvent } from 'primeng/primeng';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiURL;

  expenses: IExpense[];

  constructor(private http: HttpClient) { }

  // =============================================================================
  // * GET DISTINCT CATEGORIES
  // =============================================================================
  getCategories(): Observable<any> {
    return this.http.get<any>(`${ this.baseUrl }/expenses/categories`);
  }

  // ===========================================================================
  // * GET EXPENSES
  // ===========================================================================
  getExpenses(query: LazyLoadEvent): Observable<IExpense[]> {

    let order = 'DESC';
    let filter = query.globalFilter;

    if (query.sortOrder === -1) {
      order = 'ASC';
    }

    if (filter === null) {
      filter = '';
    }

    const params1 = `?filter[limit]=${ query.rows }&filter[skip]=${ query.first }`;
    const params2 = `&filter[order]=${ query.sortField } ${ order }&filter[where][item][ilike]=%${ filter }%`;

    return this.http.get<IExpense[]>(`${ this.baseUrl }/expenses${ params1 }${ params2 }`,
      this.getHeaders());
  }

  // =============================================================================
  // * NUMBER of EXPENSES
  // =============================================================================
  getCount(query: LazyLoadEvent): Observable<any> {
    let filter = query.globalFilter;
    if (filter === null) {
      filter = '';
    }

    const params = `?where[item][ilike]=%${ filter }%`;
    return this.http.get<any>(`${ this.baseUrl }/expenses/count${ params }`);
  }

  // =============================================================================
  // ? CREATE, UPDATE
  // =============================================================================
  save(expense: IExpense) {
    if (!expense.item) { expense.item = ''; }

    if (expense.id === undefined) {
      return this.http.post<IExpense>(`${ this.baseUrl }/expenses`, expense, this.getHeaders());
    } else {
      const id = expense.id;
      return this.http.put<IExpense>(`${ this.baseUrl }/expenses/${ id }`, expense, this.getHeaders());
    }
  }

  // ===========================================================================
  // ? DELETE
  // ===========================================================================
  delete(expense: IExpense) {
    const id = expense.id;
    return this.http.delete<IExpense>(`${ this.baseUrl }/expenses/${ id }`, this.getHeaders());
  }

  // =============================================================================
  // ? HEADERS
  // =============================================================================
  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return httpOptions;
  }
}
