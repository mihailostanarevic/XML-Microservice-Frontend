import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { CarBrandService } from '../../../services/car-brand.service';
import { CarModelService } from '../../../services/car-model.service';
import { CarClassService } from '../../../services/car-class.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-advanced-search-form',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  @Input() dates: Object;
  @Input() city: string;

  showResults: Boolean;
  searchResults: any[] = [];
  allCarBrands: any[] = [];
  allCarModels: any[] = [];
  allFuelTypes: any[] = [];
  allGearshiftTypes: any[] = [];
  allCarClasses: any[] = [];
  selectedCarBrand: any;
  selectedCarModel: any;
  selectedFuelType: any;
  selectedGearshiftType: any;
  selectedCarClass: any;
  public validateForm: FormGroup;
  page:string = '"advanced-search"';
  childSeats: number;
  cdw: boolean;
  plannedKms: number;
  priceTo: number;
  priceFrom: number;

  constructor(private searchService: SearchService, private carBrandService: CarBrandService, private carModelService: CarModelService, private carClassService: CarClassService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allGearshiftTypes.push("Manuel"); //typo
    this.allGearshiftTypes.push("Automatic");
    this.allFuelTypes.push("Diesel");
    this.allFuelTypes.push("Benzine");
    this.cdw = false;
    this.showResults = false;
    this.carBrandService.getAllCarBrands().subscribe( data => {
      console.log(data);
      this.allCarBrands = data;
    })
    this.carModelService.getAllCarModels().subscribe( data => {
      this.allCarModels = data;
    })
    this.carClassService.getAllCarClasses().subscribe( data => {
      this.allCarClasses = data;
    })

    this.validateForm = this.fb.group({
      priceFrom: [null, [Validators.pattern('^[0-9]*$')]],
      priceTo: [null, [Validators.pattern('^[0-9]*$')]],
      estimatedDistance: [null, [Validators.pattern('^[0-9]*$')]],
      childrenSeats: [null, [Validators.pattern('^[0-9]*$')]]
    });
  }

  submitAdvancedSearch() : void{
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm.value);
    let data = {
      city: this.city,
      from: this.dates["from"],
      to: this.dates["to"],
      brand: this.selectedCarBrand == undefined ? "" : this.selectedCarBrand.name,
      model: this.selectedCarModel == undefined ? "" : this.selectedCarModel.name,
      fuelType: this.selectedFuelType == undefined ? "" : this.selectedCarBrand.name,
      gearshiftType: this.selectedGearshiftType == undefined ? "" : this.selectedGearshiftType,
      carClass: this.selectedCarClass == undefined ? "" : this.selectedCarClass.name,
      cdw: this.cdw,
      ...this.validateForm.value
    }

    this.searchService.advancedSearch(data).subscribe( data => {
      this.searchResults = data;
      this.searchResults.forEach( element => {
        let date = new Date(element.ad.creationDate.split("-")[0],parseInt(element.ad.creationDate.split("-")[1])-1,element.ad.creationDate.split("-")[2]);
        element.ad["formattedDate"]= date.toString().substring(0,15);
      })
      localStorage.setItem("advanced-search", JSON.stringify(this.searchResults));
    });
  }

  carBrandChanged($event) : void {
    this.carModelService.getCarModelsByBrand($event.id).subscribe( data => {
      this.allCarModels = data;
    })

    this.selectedCarBrand = $event;
  }

  carModelChanged($event) : void {
    this.selectedCarModel = $event;
  }

  fuelTypeChanged($event) : void {
    this.selectedFuelType = $event;
  }

  gearshiftTypeChanged($event) : void {
    this.selectedGearshiftType = $event;
  }

  carClassChanged($event) : void {
    this.selectedCarClass = $event;
  }
}
