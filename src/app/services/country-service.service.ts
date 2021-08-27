import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  constructor(private http: HttpClient) {
  }

  getAPIData() {
    const url = 'https://restcountries.eu/rest/v2/all';
    return this.http.get(url);
  }

  getCountry(country) {
    const countryURL = 'https://restcountries.eu/rest/v2/name/'.concat(country);
    return this.http.get(countryURL);
  }

  getRegion(region) {
    const regionURL = 'https://restcountries.eu/rest/v2/region/'.concat(region);
    return this.http.get(regionURL);
  }

  searchByCode(code) {
    const codeURL = 'https://restcountries.eu/rest/v2/alpha/'.concat(code);
    return this.http.get(codeURL);
  }
}
