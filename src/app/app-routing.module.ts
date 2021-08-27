import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCountriesComponent} from './list-countries/list-countries.component';
import {CountryDetailComponent} from './country-detail/country-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListCountriesComponent,
  },
  {
    path: 'detail/:country',
    component: CountryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
