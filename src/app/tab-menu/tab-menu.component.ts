import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Expenses', icon: 'fas fa-table', routerLink: ['/expenses']},
      {label: 'Charts', icon: 'far fa-chart-bar', routerLink: ['/charts']}
  ];
  }

}
