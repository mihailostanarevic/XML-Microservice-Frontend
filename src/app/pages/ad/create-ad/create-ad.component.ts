import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarModelService } from './../../../services/car-model.service';
import { GearshiftTypeService } from './../../../services/gearshift-type.service';
import { FuelTypeService } from './../../../services/fuel-type.service';
import { NzMessageService, UploadFile, NgZorroAntdModule } from 'ng-zorro-antd';
import { CreateAdService } from './../../../services/ad.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../../store/app.reducer";
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  isLimitedDistance = true;     // limitedDistance
  isCDW = true;     // cdw
  availableKilometers?: string;    //Basic usage1
  kilometersTraveled?: string;    //Basic usage2
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  value = '';         // number of seats
  title = 'Input a number of child seats';

  inputCarModel?: string;
  filteredCarModelOptions: string[] = [];
  carModelOptions = [];

  defaultFileList: UploadFile[] = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ];

  fileList2 = [...this.defaultFileList];

  constructor(private carModelService: CarModelService,
              private gearshiftTypeService: GearshiftTypeService,
              private fuelTypeService: FuelTypeService,
              private message: NzMessageService,
              private adService: CreateAdService,
              private store: Store<fromApp.AppState>,
              private http: HttpClient) {

   }

  ngOnInit(): void {
    this.setupCarModelList();
    this.setupGearshiftType();
    this.setupFuelTypeList();
  }

  selectedHandle = 'Manuel';
  selectedGearNumber = 'Five';
  handleData = [];
  gearNumberData: { [place: string]: string[] } = {
    Manuel: [],
    Automatic: [],
    Semiautomatic: []
  };

  gearChange(value: string): void {
    this.selectedGearNumber = this.gearNumberData[value][0];
  }

  selectedFuelType = 'Diesel';
  selectedTankCapacity = '50L, no gas';
  fuelData = [ ];
  tankData: { [place: string]: string[] } = {
    Diesel: [],
    Benzine: []
  };

  fuelChange(value: string): void {
    this.selectedTankCapacity = this.tankData[value][0];
  }

  setupCarModelList(): void {
    this.carModelService.getAllCarModels().subscribe(data => {
      data.forEach(element => {
        this.carModelOptions.push(element.brandName + ", " + element.name + ", " + element.className);
      });
      this.filteredCarModelOptions = this.carModelOptions;
    }, error => {
      console.log(error.error.message);
    });
  }

  setupGearshiftType(): void {
    this.gearshiftTypeService.getAllGearshiftTypes().subscribe(data => {
      data.forEach(element => {
        if(!this.handleData.some(x => x === element.type)) {
          this.handleData.push(element.type);
        }
        if(element.type === 'Manuel'){
          this.gearNumberData.Manuel.push(element.numberOfGears);
        } else if(element.type === 'Automatic') {
          this.gearNumberData.Automatic.push(element.numberOfGears);
        } else if(element.type === 'Semiautomatic') {
          this.gearNumberData.Semiautomatic.push(element.numberOfGears);
        }
      });
    }, error => {
      console.log(error.error.message);
    })
  }

  setupFuelTypeList(): void {
    this.fuelTypeService.getAllFuelTypes().subscribe(data => {
      data.forEach(element => {
        if(!this.fuelData.some(x => x === element.type)) {
          this.fuelData.push(element.type);
        }
        if(element.type === 'Diesel'){
          this.tankData.Diesel.push(element.tankCapacity + ", " + (element.gas === true ? 'gas' : 'no gas'));
        } else if(element.type === 'Benzine'){
          this.tankData.Benzine.push(element.tankCapacity + ", " + (element.gas === true ? 'gas' : 'no gas'));
        }
      });
    }, error => {
      console.log(error.error.message);
    });
  }

  onChangeCarModel(value: string): void {
    this.filteredCarModelOptions = this.carModelOptions.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  createAd(): void {
    if( !this.availableKilometers || !this.kilometersTraveled || !this.value || !this.inputCarModel) {
        this.message.warning("Input fields is required");
        return;
    }

    let agentId;
    this.store.select("auth").subscribe(authData => {
        agentId = authData.user.id;
    });

console.log(this.selectedHandle + ", " + this.selectedGearNumber);

    // image & user
    var formData = new FormData();
    this.fileList2.forEach(element => {
      formData.append('imageFile', element.originFileObj, element.originFileObj.name);
    });
    formData.append('request', new Blob([JSON.stringify({
      'carModel': this.inputCarModel,
      'gearshiftType': this.selectedHandle + ", " + this.selectedGearNumber,
      'fuelType': this.selectedFuelType + ", " + this.selectedTankCapacity,
      'agentId': agentId,
      'limitedDistance': this.isLimitedDistance,
      'availableKilometersPerRent': this.availableKilometers,
      'kilometersTraveled': this.kilometersTraveled,
      'seats': this.value,
      'cdw': this.isCDW
    })], {
        type: "application/json"
    }));
    this.adService.postAd(formData).subscribe(() => {
      this.message.info('Successfully created!');
    }, error => {
        console.log(error.error.message);
        this.message.info('Something was wrong.');
    });
  }
}
