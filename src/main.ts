import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';



//localisation 
registerLocaleData(localeFr, 'fr');

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
