import { Component, OnInit } from '@angular/core';
import { IExpense } from '../shared/expense.model';

import { DatePipe } from '@angular/common';
import { DataService } from '../shared/data.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { SelectItem } from 'primeng/api';

interface ICategory {
  category: string;
}

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css'],
  providers: [DatePipe]
})
export class ListExpenseComponent implements OnInit {

  expenses: IExpense[];
  expense: IExpense;
  selectedExpense: IExpense;
  categories: SelectItem[];

  cols: any[];
  totalRecords: number;
  loading = true;

  modalTitle = 'Add Expense';
  displayDialog: boolean;
  newExpense: boolean;

  lastEvent: LazyLoadEvent;

  constructor(private dataService: DataService, private dp: DatePipe) {

  }

  ngOnInit() {
    this.cols = [
      {
        field: 'date', header: 'Date',
        Style: { 'text-align': 'center', 'width': '80px' },
        type: this.dp, arg1: 'dd/MM/yy'
      },
      {
        field: 'category', header: 'Category',
        Style: { 'text-align': 'center', 'width': '100px' }
      },
      {
        field: 'item', header: 'Item',
        Style: { 'text-align': 'center' }
      },
      {
        field: 'price', header: 'Price',
        Style: { 'text-align': 'right', 'width': '70px' }
      }
    ];
}

  // ===========================================================================
  // EVENT
  // ===========================================================================
  loadExpensesLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.lastEvent = event;

    if (!event.sortField) {
      event.sortField = 'date';
    }

    this.getCount(event);
    this.getCategories();

    this.dataService.getExpenses(event)
      .subscribe(data => {
        this.expenses = data;
        this.loading = false;
        this.expenses.forEach(el => {
          el.date = new Date(el.date);
        });
      });
  }

  // =============================================================================
  // ? GET CATEGORIES
  // =============================================================================
  getCategories() {
    let response;
    this.categories = [];

    this.dataService.getCategories()
      .subscribe(res => {
        response = res;
        // console.log(res);
        response.forEach(element => {
          if (element.category !== null) {
            this.categories.push({label: element.category, value: element.category});
          }
        });
        // console.log('this.categories', this.categories);
      });
  }

  // ===========================================================================
  // MODAL POPUP
  // ===========================================================================
  showDialogToAdd() {
    this.modalTitle = 'Add Expense';
    this.newExpense = true;
    this.expense = {} as IExpense;
    this.expense.date = new Date();
    this.displayDialog = true;
  }

  // =============================================================================
  // SAVE OR UPDATE
  // =============================================================================
  save(expense: IExpense) {
    // console.log('expense: ', expense);

    this.dataService.save(expense).subscribe(res => {
      this.loadExpensesLazy(this.lastEvent);
    });

    this.displayDialog = false;
    this.expense = {} as IExpense;
    this.expense.date = new Date();
  }

  // ===========================================================================
  // NUMBER OF ROWS
  // ===========================================================================
  getCount(event: LazyLoadEvent) {
    this.dataService.getCount(event)
      .subscribe(res => {
        this.totalRecords = res.count;
      });
  }

  // ===========================================================================
  // ON SELECT
  // ===========================================================================
  onRowSelect(event) {
    // console.log(event.data);
    this.modalTitle = 'Edit Expense';
    this.newExpense = false;
    this.expense = event.data;
    this.displayDialog = true;
  }

  // ===========================================================================
  // CLOSE MODAL
  // ===========================================================================
  closeDialog() {
    this.displayDialog = false;
    this.expense = {} as IExpense;
    this.expense.date = new Date();
  }

  // ===========================================================================
  // DELETE ROW
  // ===========================================================================
  deleteExpense(expense: IExpense) {
    // console.log('event', expense);
    this.dataService.delete(expense)
      .subscribe(res => {
        // console.log('response', res);
        this.displayDialog = false;
        this.loadExpensesLazy(this.lastEvent);
      });
  }
}
