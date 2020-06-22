import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Address } from './../../../shared/address.model';
import { NzMessageService } from 'ng-zorro-antd';
import { CreateAdService } from 'src/app/services/ad.service';
import { Router } from '@angular/router';

interface DataItem {
  id: string;
  agentID: string;
  name: string;
  limitedDistance: boolean;
  availableKilometersPerRent: string;
  seats: number;
  cdw: boolean;
  fullLocations: Address[];
}
@Component({
  selector: 'app-agent-rent',
  templateUrl: './agent-rent.component.html',
  styleUrls: ['./agent-rent.component.css']
})
export class AgentRentComponent implements OnInit, OnDestroy {
  agentID: string;
  adID: string;
  addressID: string;
  userSubscription: Subscription;
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [];
  listOfDisplayData = [...this.listOfData];
  dateFrom: Date;
  dateTo: Date;
  dates: Object;

  pickedDateFrom: string;
  pickedDateTo: string;
  pickedTimeFrom: string;
  pickedTimeTo: string;

  inputUsername?: string;
  filteredOptions: string[] = [];
  options = [];

  constructor(private userService: UserService,
              private store: Store<fromApp.AppState>,
              private message: NzMessageService,
              private adService: CreateAdService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(userData => {
      this.agentID = userData.user.id;
    });

    this.userService.getAgentAds({
      'id': this.agentID
    }).subscribe(adList => {
      this.listOfData = adList;
      this.listOfDisplayData = [...this.listOfData];
    });

    this.userService.getUsers().subscribe(users => {
      let usernameList = [];
      users.forEach(user => {
        usernameList.push(user.username);
      });
      console.log(usernameList[0]);
      this.options = usernameList;
      this.filteredOptions = this.options;
    });
  }

  onChangeInputUser(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  isVisible = false;

  // send request
  handleOk(): void {
    if(!this.addressID || !this.pickedDateFrom || !this.pickedTimeTo || !this.pickedDateTo ||
        !this.pickedTimeFrom || !this.inputUsername) {
      this.message.info('All input fields must be filled.');
    } else {
      this.isVisible = false;
      this.adService.agentRent({
        "adID" : this.adID,
        "agentID" : this.agentID,
        "customerUsername" : this.inputUsername,
        "pickUpDate" : this.pickedDateFrom,
        "pickUpTime" : this.pickedTimeFrom,
        "returnDate" : this.pickedDateTo,
        "returnTime" : this.pickedTimeTo,
        "pickUpAddress" : this.addressID,
        "bundle" : false
      }).subscribe(response => {
        this.message.info('Request is successfully created!');
      }, error => {
        this.message.warning('Request is not well created.');
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createRequest(id: string): void {
    this.isVisible = true;
    this.adID = id;
  }

  onChange(result: Date): void {
    this.dateFrom = new Date(result[0]);
    this.dateTo = new Date(result[1]);
    this.formatDatesCorrectly(this.dateFrom.toISOString(),this.dateTo.toISOString());
    this.pickedTimeFrom = this.dates["from"].split(" ")[0];
    this.pickedTimeTo = this.dates["to"].split(" ")[0];
    this.pickedDateFrom =this.dates["from"].split(" ")[1];
    this.pickedDateTo = this.dates["to"].split(" ")[1];
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

  pickUpAddress(event, id): void {
    this.addressID = id;
    this.message.info("You pick address: " + event.srcElement.innerText);
  }

  createProfile(): void {
    this.router.navigateByUrl('auth/registration');
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
