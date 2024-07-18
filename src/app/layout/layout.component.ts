import { Component } from '@angular/core';
import {ContentComponent} from "./content/content.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ContentComponent,
    SearchBarComponent,
    TopBarComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
