import { Routes } from '@angular/router';
 
import {WelcomeComponent} from "./layout/welcome/welcome.component";

export const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
  },
  {
    path:'dashboard',
    loadComponent:()=>import('./layout/content/dashboard/dashboard.component').then(mod => mod.DashboardComponent )
  },
  {
    path:'saved-currencies',
    loadComponent:()=>import('./layout/content/saved-currencies/saved-currencies.component').then(mod => mod.SavedCurrenciesComponent)
  },
  {
    path:'world-financial-news',
    loadComponent:()=>import('./layout/content/world-financial-news/world-financial-news.component').then(mod =>mod.WorldFinancialNewsComponent)
  },

];
