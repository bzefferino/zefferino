import { Component, HostBinding, OnInit } from '@angular/core';
import { ApplicationStateService } from './Services/application-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  darkMode: boolean = this.applicationStateService.isDarkMode();
  isMobileResolution: boolean = this.applicationStateService.isMobileResolution;

  @HostBinding('class') className = '';

  public readonly lightClassName: string = '';
  public readonly darkClassName: string = 'dark-theme';

  constructor(private applicationStateService: ApplicationStateService) { }

  ngOnInit(): void {
    // Subscribe to the application state service for dark mode's value changes that comes from the nav bar component
    this.applicationStateService.darkMode$.subscribe(
      (x) => {
        this.className = x ? this.darkClassName : this.lightClassName;
        this.darkMode = x;
      }
    )
  }
}

