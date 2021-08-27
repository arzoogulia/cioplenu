import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShareService} from '../services/share.service';
import {CountryServiceService} from '../services/country-service.service';
import {Country, Currency, Language} from '../list-countries/countyData';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  clickData: string;
  data: Country;
  countryArea;
  countyName: string;
  borders: string[];
  population: number;
  currency: Currency[];
  countryRegion: string;
  subRegion: string;
  timezones: string[];
  nameNative: string;
  numericCode: string;
  languages: Language[];
  countryFlag: string;
  topLevelDomain: string[];
  alphaCode2: string;
  alphaCode3: string;
  callingCodes: string[];
  countryCapital: string;
  selectedBorder: string;

  constructor(private router: Router,
              private countryData: CountryServiceService,
              private shared: ShareService) {
  }

  ngOnInit(): void {
    this.clickData = this.shared.getClickData();

    this.countryData.searchByCode(this.clickData).subscribe((data: Country) => {
      this.data = data;
      console.log('data', this.data);
      console.log('borders', this.data.borders);
      this.countyName = this.data.name;
      this.countryCapital = this.data.capital;
      this.countryArea = this.data.area;
      this.borders = this.data.borders;
      this.population = this.data.population;
      this.currency = this.data.currencies;
      this.countryRegion = this.data.region;
      this.subRegion = this.data.subregion;
      this.timezones = this.data.timezones;
      this.nameNative = this.data.nativeName;
      this.numericCode = this.data.numericCode;
      this.languages = this.data.languages;
      this.countryFlag = this.data.flag;
      this.topLevelDomain = this.data.topLevelDomain;
      this.alphaCode2 = this.data.alpha2Code;
      this.alphaCode3 = this.data.alpha3Code;
      this.callingCodes = this.data.callingCodes;
    });
  }

  backClick() {
    this.router.navigate(['']);
  }

  navigateBorder(border) {
    this.countryData.searchByCode(border).subscribe((data: Country) => {
      this.data = data;
      this.countyName = this.data.name;
      this.countryCapital = this.data.capital;
      this.countryArea = this.data.area;
      this.borders = this.data.borders;
      this.population = this.data.population;
      this.currency = this.data.currencies;
      this.countryRegion = this.data.region;
      this.subRegion = this.data.subregion;
      this.timezones = this.data.timezones;
      this.nameNative = this.data.nativeName;
      this.numericCode = this.data.numericCode;
      this.languages = this.data.languages;
      this.countryFlag = this.data.flag;
      this.topLevelDomain = this.data.topLevelDomain;
      this.alphaCode2 = this.data.alpha2Code;
      this.alphaCode3 = this.data.alpha3Code;
      this.callingCodes = this.data.callingCodes;
    });
    this.router.navigate(['detail', this.countyName]);
    console.log('border:', border);
  }

}
