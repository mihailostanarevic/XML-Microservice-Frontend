import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import * as fromApp from '../../../store/app.reducer';
import { CreateAdService } from 'src/app/services/ad.service';

interface DataItem {
  id: string;
  customer: string;
  ad: string;
  receptionDate: string;
  pickUpAddress: string;
}
@Component({
  selector: 'app-agent-requests',
  templateUrl: './agent-requests.component.html',
  styleUrls: ['./agent-requests.component.css']
})
export class AgentRequestsComponent implements OnInit {
  subscriptionUser: Subscription;
  activeUserID: string;
  requestStatus: string = 'PENDING';

  constructor(private requestService: RequestService,
              private store: Store<fromApp.AppState>,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
        this.activeUserID = userData.user.id;
        this.getAgentRequest('PENDING');
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

  getAgentRequest(reqStatus): void {
    this.requestStatus = reqStatus;
    // this.message.info(reqStatus + " requests agent.");
    this.requestService.getAgentRequests({
      "id": this.activeUserID,
      "requestStatus": reqStatus
    }).subscribe(response => {
      this.listOfData = response;
      this.listOfDisplayData = [...this.listOfData];
    })
  }

  ngOnDestroy(): void {
    if(this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }

  approveRequest(id): void {
    this.requestService.approveRequest({
      "id": this.activeUserID,
      "resID": id
    }).subscribe(response => {
      this.listOfData = response;
      this.listOfDisplayData = [...this.listOfData];
    })
  }
}
