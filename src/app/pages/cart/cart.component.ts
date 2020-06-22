import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzButtonSize, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { Ad } from 'src/app/shared/ad.model';
import * as CartActions from '../../cart/store/cart.actions';
import * as fromApp from "../../store/app.reducer";
import { RequestService } from './../../services/request.service';
import { Cart } from './../../shared/cart.model';
import {differenceInCalendarDays} from 'date-fns';

export interface RequestDTO {
  adID: string;
  customerID: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  pickUpAddress: string;
  bundle: boolean;
  agentID: string;
  carBrand: string;
  carModel: string;
}

export interface RequestCreateDTO {
  adID: string;
  customerID: string;
  pickUpDate: string;
  pickUpTime: string;
  returnDate: string;
  returnTime: string;
  pickUpAddress: string;
  bundle: boolean;
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartContent: Cart[];
    subscription: Subscription;
    dateFrom: Date;
    dateTo: Date;
    dates: Object;
    size: NzButtonSize = 'large';
    confirmModal?: NzModalRef;

    constructor(private store: Store<fromApp.AppState>,
                private message: NzMessageService,
                private requestService: RequestService) { }

    ngOnInit(): void {
      this.dates = {
        from : "",
        to: ""
      }
        this.subscription = this.store.select('cart').subscribe(cartItems => {
            this.cartContent = cartItems.cartContent;
        });
    }

    onChangeDate(result: Date, adID?: string): void {
      this.dateFrom = new Date(result[0]);
      this.dateTo = new Date(result[1]);
      this.formatDatesCorrectly(this.dateFrom.toISOString(),this.dateTo.toISOString());
      const timeFrom:string = this.dates["from"].split(" ")[0];
      const timeTo:string = this.dates["to"].split(" ")[0];
      const dateFrom:string =this.dates["from"].split(" ")[1];
      const dateTo:string = this.dates["to"].split(" ")[1];
      // console.log(timeFrom + "-" +timeTo + ", " +dateFrom + "-" +dateTo);
      let index: number;
      this.store.select('cart').subscribe(content => {
        index = content.cartContent.findIndex(x => x.ad.id === adID);
      });

      this.store.dispatch(new CartActions.ChangeDateTime({
        id: adID,
        dateFrom: dateFrom,
        dateTo: dateTo,
        timeFrom: timeFrom,
        timeTo: timeTo,
        index: index
      }));

      this.message.info("Pick Up Time: " + dateFrom + " at " + timeFrom +
                  ", Return time: " + dateTo + " at " + timeTo);
    }

    formatDatesCorrectly(date1 : string, date2 : string) : void {
      let timeFrom = date1.split('T')[1].substring(0,5);
      let timeTo = date2.split('T')[1].substring(0,5);
      let dateFrom = date1.split('T')[0];
      let dateTo = date2.split('T')[0];
      this.dates = {
        from : timeFrom + " " + dateFrom,
        to : timeTo + " " + dateTo,
      }
    }

    sendRequest(): void {
      let requestBody: RequestDTO[] = [];
      let customerID: string;
      let isOk: boolean[] = [];
      this.store.select('auth').subscribe(authData => {
        customerID = authData.user.id;
      });
      this.store.select('cart').subscribe(cart => {
        cart.cartContent.forEach(cart => {
          let requestDTO: RequestDTO;
          if(this.checkInputFields(cart)) {
            isOk.push(true);
            const ad: Ad = {...cart.ad};
            requestDTO = {
              adID: ad.id,
              customerID: customerID,
              pickUpDate: ad.dateFrom,
              pickUpTime: ad.timeFrom,
              returnDate: ad.dateTo,
              returnTime: ad.timeTo,
              pickUpAddress: ad.pickUpAddressID,
              agentID: cart.agent.id,
              carBrand: cart.car.brand,
              carModel: cart.car.model,
              bundle: false
            }

            requestBody.push(requestDTO);
          } else {
            isOk.push(false);
          }
        });
      });

      if(isOk.indexOf(false) === -1) {
        let processedList: RequestDTO[] = [];
        requestBody.forEach(request => {
          if(processedList.indexOf(request) === -1) {
            let bundleList: RequestDTO[] = [];
            requestBody.forEach(requestInside => {
              if(request.agentID === requestInside.agentID) {
                processedList.push(requestInside);
                bundleList.push(requestInside);
              }
            });

            if(bundleList.length > 1) {
              let bundleQ = "";
              bundleList.forEach(element => {
                bundleQ += element.carBrand + " " + element.carModel + ", ";
              });
              if(confirm('Do you want to create one bundle request for ads: '+ bundleQ)) {
                bundleList.forEach(element => {
                  const isInRequestBody: number = requestBody.indexOf(element);
                  if(isInRequestBody !== -1) {
                    requestBody[isInRequestBody].bundle = true;
                  }
                });
              }
            }
          }
        });

        console.log('sending request, len:' + requestBody.length);
        this.requestService.sendRequest(requestBody).subscribe(response => {
          this.message.info(response.message);
          this.store.dispatch(new CartActions.ClearCart());
        });
      } else {
        this.message.warning('Please fill all input fields.');
      }
    }

    // check whether input fields(date & address) is filled
    checkInputFields(cart: Cart): boolean {
      if(!cart.ad.dateFrom || !cart.ad.dateTo || !cart.ad.timeFrom || !cart.ad.timeTo || !cart.ad.pickUpAddressID) {
        return false;
      }
      return true;
    }

    changeAddress(event, adID: string): void {
      const addresClicked: string = event.srcElement.attributes[2].nodeValue;
      this.message.info("You pick address: " + event.srcElement.innerText);
      let index: number;
      this.store.select('cart').subscribe(content => {
        index = content.cartContent.findIndex(x => x.ad.id === adID);
      });
      this.store.dispatch(new CartActions.ChangeAddress({
        index: index,
        address:addresClicked
      }));
    }

    disabledDate = (current: Date): boolean => {
      return differenceInCalendarDays(new Date(), current) > 0;
    };

}
