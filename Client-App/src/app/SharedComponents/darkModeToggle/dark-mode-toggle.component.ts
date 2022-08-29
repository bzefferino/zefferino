import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApplicationStateService } from 'src/app/Services/application-state.service';

@Component({
  selector: 'dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent implements OnInit {

  constructor(
    private applicationStateService: ApplicationStateService
  ) { }

  darkMode: boolean = false;
  darkModeToggle: FormControl = new FormControl(this.applicationStateService.isDarkMode);
  isMobileResolution: boolean = this.applicationStateService.isMobileResolution;

  ngOnInit(): void {
    this.darkModeToggle.valueChanges.subscribe(
      (darkMode) => {
        this.applicationStateService.setDarkMode(darkMode);
      }
    );

    this.applicationStateService.darkMode$.subscribe(
      (x) => {
        this.darkMode = x;
      }
    )
  }

}
