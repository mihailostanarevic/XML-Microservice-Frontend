import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from './../../../services/request.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { NzMessageService } from 'ng-zorro-antd';

interface DataItem {
  id: string,
  agent: string;
  ad: string;
  receptionDate: string;
  pickUpAddress: string;
}
@Component({
  selector: 'app-simple-user-requests',
  templateUrl: './simple-user-requests.component.html',
  styleUrls: ['./simple-user-requests.component.css']
})
export class SimpleUserRequestsComponent implements OnInit, OnDestroy {
  subscriptionUser: Subscription;
  activeUserID: string;
  requestStatus: string = 'PENDING';

  constructor(private requestService: RequestService,
              private store: Store<fromApp.AppState>,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserID = userData.user.id;
      this.getUserRequest('PENDING');
    });
  }

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.ad.indexOf(this.searchValue) !== -1);
  }

  getUserRequest(reqStatus): void {
    this.requestStatus = reqStatus;
    // this.message.info(reqStatus + " requests.");
    this.requestService.getRequests({
      "id": this.activeUserID,
      "requestStatus": reqStatus
    }).subscribe(response => {
      this.listOfData = response;
      this.listOfDisplayData = [...this.listOfData];
    })
  }

  payRequest(resID): void {
    this.requestService.payRequest({
      "id": this.activeUserID,
      "requestID": resID
    }).subscribe(response => {
      this.listOfData = response;
      this.listOfDisplayData = [...this.listOfData];
    })
  }

  dropRequest(resID): void {
    this.requestService.dropRequest({
      "id": this.activeUserID,
      "requestID": resID
    }).subscribe(response => {
      this.message.info('Successfuly drop this request.');
      this.listOfData = response;
      this.listOfDisplayData = [...this.listOfData];
    })
  }

  ngOnDestroy(): void {
    if(this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }

}
