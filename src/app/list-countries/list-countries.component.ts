import {Component, OnInit, ViewChild} from '@angular/core';
import {CountryServiceService} from '../services/country-service.service';
import {Country} from './countyData';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {ShareService} from '../services/share.service';

interface FilterRegion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss']
})

export class ListCountriesComponent implements OnInit {

  regionList: FilterRegion[] = [
    {value: 'asia', viewValue: 'Asia'},
    {value: 'africa', viewValue: 'Africa'},
    {value: 'americas', viewValue: 'Americas'},
    {value: 'europe', viewValue: 'Europe'},
    {value: 'oceania', viewValue: 'Oceania'}
  ];

  listOfRegion = [];
  country = '';
  selectedValue;
  selectedValue2;
  codeTwo = '';
  codeThree = '';
  filterCountry = false;
  filterRegion = false;
  countries: Country[];
  regions: Country[];
  data: Country[];
  displayedColumns: string[] = ['name', 'nativeName', 'capital', 'region', 'demonym', 'area', 'neighbours'];
  clickedRows = new Set<Country>();
  flag1 = false;
  flag2 = false;
  nation = '';

  constructor(private countryData: CountryServiceService,
              private router: Router,
              private shared: ShareService) {
    this.countryData.getAPIData().subscribe((data: Country[]) => {
      this.data = data;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  clear() {
    this.country = '';
    this.selectedValue = '';
    this.selectedValue2 = '';
    this.nation = '';
    this.filterCountry = false;
    this.filterRegion = false;
    this.flag1 = false;
    this.flag2 = false;
  }

  applyFilter(event) {
    console.log('event search:', event);
  }

  // filter(value) {
  //   if ((this.selectedValue != '') && (this.selectedValue2 === '')) {
  //     this.countryData.getCountry(value.toLowerCase()).subscribe((countriesData: Country[]) => {
  //       this.countries = countriesData;
  //       this.country = countriesData[0].name;
  //       this.filterCountry = true;
  //       console.log('country selected:', this.country);
  //     });
  //   } else if ((this.selectedValue2 != '') && ((this.selectedValue === ''))) {
  //     this.countryData.getRegion(value.toLowerCase()).subscribe((regionData: Country[]) => {
  //       this.regions = regionData;
  //       for (let i = 0; i < regionData.length; i++) {
  //         this.listOfRegion[i] = regionData[i].name;
  //       }
  //       this.filterRegion = true;
  //       console.log('region selected:', this.regions);
  //     });
  //   }
  //   if ((this.selectedValue != '') && (this.selectedValue2 != '')) {
  //     if (this.listOfRegion[0].includes(this.country)) {
  //       console.log('inside both selections 1', this.country);
  //       this.flag1 = true;
  //       this.countryData.getCountry(this.country.toLowerCase()).subscribe((countriesData: Country[]) => {
  //         this.countries = countriesData;
  //         console.log('both selected:', this.countries);
  //       });
  //     }
  //   }
  // }

  async countryFilter(value) {
    this.countryData.getCountry(value.toLowerCase()).subscribe((countriesData: Country[]) => {
      this.countries = countriesData;
      this.country = countriesData[0].name;
      this.filterCountry = true;
      console.log('country selected:', this.country);
      if (this.filterRegion === true) {
        this.isIN();
      }
    });
  }

  regionFilter(value) {
    this.countryData.getRegion(value.toLowerCase()).subscribe((regionData: Country[]) => {
      this.regions = regionData;
      for (let i = 0; i < regionData.length; i++) {
        this.listOfRegion[i] = regionData[i].name;
      }
      console.log('region selected:', this.regions);
      this.filterRegion = true;
    });
  }

  isIN() {
    console.log('inside both true');
    if (this.filterCountry === true && this.filterRegion === true) {
      if (this.listOfRegion.includes(this.country)) {
        this.flag1 = true;
        this.countryData.getCountry(this.country.toLowerCase()).subscribe((countriesData: Country[]) => {
          this.countries = countriesData;
          console.log('both selected:', this.countries);
        });
      } else {
        this.flag2 = true;
      }
    }
  }

  rowClick(event) {
    console.log('event', event);
    this.codeTwo = event.alpha2Code;
    this.codeThree = event.alpha3Code;
    this.shared.setClickData(event.alpha3Code);
    this.router.navigate(['detail', event.name]);
  }

}
