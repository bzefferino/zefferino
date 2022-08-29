import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationStateService } from 'src/app/Services/application-state.service';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailFormGroup: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  constructor(
    private applicationStateService: ApplicationStateService,
    private contactService: ContactService
  ) { }

  darkMode: boolean = this.applicationStateService.isDarkMode();

  ngOnInit(): void {
    this.applicationStateService.darkMode$.subscribe(
      (x) => {
        this.darkMode = x;
      }
    )
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.contactService.emailMessage(formData).subscribe(
      (response) => {
        // Todo: Success animation on page
        location.href = 'https://mailthis.to/confirm';
        console.log(response);
      },
      (error) => {
        console.warn(error.responseText);
        console.log({ error });
        // Todo: some popup error
      });
  }

  getErrorMessage() {
    if (this.emailFormGroup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormGroup.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
