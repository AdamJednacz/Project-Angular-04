import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { ApiService } from '../../../api/api.service';
import {PeriodicElement} from "../../../periodicElement.model";
import {MatTableDataSource} from "@angular/material/table";
import {Rate} from "../../../rate.model";
import {SearchBarComponent} from "../../search-bar/search-bar.component";

/**
 * @title Basic use of `<dashboard mat-dashboard>`
 */
@Component({
  selector: 'app-dashboard',
  styleUrl: 'dashboard.component.scss',
  templateUrl: 'dashboard.component.html',
  standalone: true,
  imports: [MatTableModule, SearchBarComponent],
})
export class DashboardComponent implements OnInit{
  apiService = inject(ApiService)
  displayedColumns: string[] = ['position', 'ask', 'bid', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const subscription = this.apiService.ELEMENT_DATA.subscribe(data => {
      this.dataSource.data = data;
      console.log('DataSource:', this.dataSource.data);
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
