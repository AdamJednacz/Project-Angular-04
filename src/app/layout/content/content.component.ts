import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavedCurrenciesComponent } from './saved-currencies/saved-currencies.component';
import {WorldFinancialNewsComponent} from "./world-financial-news/world-financial-news.component";
import {ButtonsComponent} from "../../shared/buttons/buttons.component";
import {RouterOutlet} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, DashboardComponent, SavedCurrenciesComponent, WorldFinancialNewsComponent, ButtonsComponent, RouterOutlet, TopBarComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  currentView: string = 'dashboard';

  switchView(view: string) {
    this.currentView = view;
  }
}
