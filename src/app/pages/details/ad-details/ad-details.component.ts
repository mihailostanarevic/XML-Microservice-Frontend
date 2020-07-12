import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { CarAccessoriesService } from '../../../services/car-accessories.service';
import { CarAccessory } from 'src/app/shared/carAccessory.model';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from '../../../services/message.service';
import { Car } from 'src/app/shared/car.model';
import { Ad } from 'src/app/shared/ad.model';
import { Agent } from 'src/app/shared/agent.model';
import { Address } from 'src/app/shared/address.model';
import { CreateAdService } from '../../../services/ad.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as CartActions from '../../../cart/store/cart.actions';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css'],
  styles: [
    `
    [nz-carousel-content] {
      max-height: 350px !important;
      max-width: 550px !important;
      overflow: hidden;
    }

    .carousel-img{
      height: 300px;
      background-position: center !Important;
      background-size: cover !Important;
    }

    `
  ]
})
export class AdDetailsComponent implements OnInit {
  array = [1, 2, 3, 4];
  currentAd: any;
  visible = false;
  childrenVisible = false;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  previousPage: string;
  possibleAccessories: CarAccessory[] = [];
  carAccessories: CarAccessory[] = [];
  selectedCarAccessories: CarAccessory[] = [];
  text: string;
  userID: string;
  retrievedImages: string[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private carAccessoriesService: CarAccessoriesService,
    private carService: CarService, private message: NzMessageService,
    private messageService: MessageService,
    private adService: CreateAdService) { }

  ngOnInit(): void {
    this.previousPage = localStorage.getItem("page-leading-to-details");
    this.currentAd = JSON.parse(localStorage.getItem("ad-detail"));
    for(let photo of this.currentAd.ad.photos){
      this.base64Data = photo["picByte"];
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImages.push(this.retrievedImage);
    }
    console.log(this.retrievedImages);
    this.visible = false;
    this.childrenVisible = false;
    this.carService.getCarAccessories(this.currentAd.car.carID).subscribe(data => {
      this.carAccessories = data;

      this.carAccessoriesService.getAllAccessories().subscribe(data => {
        for (let item of data) {
          let found = false;
          this.carAccessories.forEach(carAccessory => {
            if (carAccessory.id === item["id"]) {
              found = true;
            }
          })
  
          if (!found) {
            let ca: CarAccessory = new CarAccessory(item["id"], null, item["description"]);
            this.possibleAccessories.push(ca);
          }
        }
      })
    })
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  addAccessory(accessory: CarAccessory) {
    console.log(accessory);
    this.carAccessories.push(accessory);
    this.selectedCarAccessories.push(accessory);
    this.possibleAccessories.splice(this.possibleAccessories.indexOf(accessory), 1)
  }

  removeAccessoryAdded(accessory: CarAccessory) {
    if (this.selectedCarAccessories.length === 0) {
      this.message.info("You can only remove equipment you previously selected");
    }

    this.selectedCarAccessories.forEach(element => {
      if (accessory.id === element.id) {
        this.selectedCarAccessories.splice(this.selectedCarAccessories.indexOf(accessory), 1);
        this.carAccessories.splice(this.carAccessories.indexOf(accessory), 1);
        this.possibleAccessories.push(accessory);
      } else {
        this.message.info("You can only remove equipment you previously selected");
      }
    })
  }

  changeText($event): void {
    this.text = $event.target.value;
  }

  sendMessage(): void {

    

    let list: string[] = [];
    this.selectedCarAccessories.forEach(accessory => {
      list.push(accessory.id);
    })

    this.store.select("auth").subscribe(authData => {
      console.log(authData.user.id);
      this.userID = authData.user.id;

      const body = {
        text: this.text,
        sender: this.userID,
        receiver: this.currentAd.agent.agentID,
        ad: this.currentAd.ad.adID,
        accessories: list
      }

      this.messageService.sendMessage(body).subscribe(data => { });
    });
  }

  addToCart(): void {
    const car: Car = {
      id: this.currentAd.car.carID,
      model: this.currentAd.car.carModelName,
      brand: this.currentAd.car.carBrandName,
      carClass: this.currentAd.car.carClassName,
      fuelType: this.currentAd.car.fuelTypeType,
      tankCapacity: this.currentAd.car.fuelTypeTankCapacity,
      gas: this.currentAd.car.fuelTypeGas,
      gearshiftType: this.currentAd.car.gearshiftTypeType,
      gearshiftNumberOfGears: this.currentAd.car.getGearshiftTypeNumberOfGears
    }
    const locations = this.currentAd.agent.locations;
    const agent: Agent = {
      id: this.currentAd.agent.agentID,
      name: this.currentAd.agent.agentName,
      locations: locations
    }
    const ad: Ad = {
      id: this.currentAd.ad.adID,
      photos: this.retrievedImages,
      dateFrom: "",
      dateTo: "",
      timeFrom: "",
      timeTo: "",
      pickUpAddress: this.currentAd.agent.locations
    }
    let userRole: any;
    this.store.select('auth').subscribe(authData => {
      userRole = authData.user.userRole;
    });
    if(userRole === "SIMPLE_USER_ROLE") {
      this.message.info('You add ' + car.brand + " " + car.model + " in your shopping cart.");
      this.store.dispatch(new CartActions.AddToCart({
        car: car,
        ad: ad,
        agent: agent
      }));
    }
  }
}
