import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';

import { ApplicationStateService } from './Services/application-state.service';
import { ContactComponent } from './SharedComponents/pages/contact/contact.component';
import { HomeComponent } from './SharedComponents/pages/home/home';


// We will have two different routes. In the case of any differences between Desktop and Mobile
// *functionality*... we will create separate components. If there are only differences in CSS,
// we will share the component and just use the @media query selector instead. This will allow
// for the best combination of mobile and desktop functionality for Angular
const desktop_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

  // directs all other routes to the main page
  { path: '**', redirectTo: '' }
];

const mobile_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

  // directs all other routes to the main page
  { path: '**', redirectTo: '' }
];

@NgModule({
  // as default we set the desktop routing configuration. if mobile will be started it will be replaced below.
  // note that we must specify some routes here (not an empty array) otherwise the trick below doesn't work...
  imports: [RouterModule.forRoot(desktop_routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public constructor(
    private router: Router,
    private applicationStateService: ApplicationStateService) {

    if (applicationStateService.isMobileResolution) {
      router.resetConfig(mobile_routes);
    }
  }
}






