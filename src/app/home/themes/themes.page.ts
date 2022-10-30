import { Component, OnInit } from '@angular/core';
import 'theme/variables.scss';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {



  constructor() { }

  // changeTheme(theme: string){
  // --ion-color-cust-primary = '#fff';
  // --ion-color-cust-secondary: blue;
  // --ion-color-cust-taskbar: green;
  // --ion-color-cust-taskbar-border: orange;
  // }

  ngOnInit() {
  }

}
