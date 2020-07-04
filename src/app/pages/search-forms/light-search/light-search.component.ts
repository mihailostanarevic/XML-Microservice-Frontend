import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';


@Component({
  selector: 'app-light-search',
  templateUrl: './light-search.component.html',
  styles: [
    `
      nz-range-picker{
        margin: 0 8px 12px 0;
      }
    `
  ],
  styleUrls: ['./light-search.component.css']
})
export class LightSearchComponent implements OnInit {
  city: String;
  dateFrom : Date;
  dateTo : Date;
  dates: Object;
  validateForm: FormGroup;
  showResults: Boolean;
  searchResults: Object[];
  page:string = '"search"';
  isVisible:boolean;
  userID: string;

  constructor(private router: Router,
    private searchService: SearchService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.showResults = false;
    this.isVisible = false;
    this.open();
    localStorage.setItem("page-leading-to-details", this.page);
    this.page = 'search';
    this.dates = {
      from : "",
      to: ""
    }

    this.validateForm = this.fb.group({
      city: [null, [Validators.required]],
      dates: [null, [Validators.required]]
    });

    this.searchResults = [];

    this.store.select('auth').subscribe(authData => {
      this.userID = authData.user.id;
    });
  }

  onChange(result: Date[]): void {
    this.dateFrom = new Date(result[0]);
    this.dateTo = new Date(result[1]);
    this.formatDatesCorrectly(this.dateFrom.toISOString(),this.dateTo.toISOString());
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

  submitSearch(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let data = {
      city: this.city,
      from: this.dates["from"],
      to: this.dates["to"]
    }

    this.searchService.lightSearch(data).subscribe(data => {
      this.showResults = true;
      this.isVisible = false;
      // this.searchResults = data;
      data.forEach(searchResult => {
        if(this.userID !== searchResult.agent.simpleUserID) {
          this.searchResults.push(searchResult);
        }
      });
      if(data.length > 0){
        for(let result of data){
          let date = new Date(result.ad.creationDate[0],result.ad.creationDate[1],result.ad.creationDate[2]);
          result.ad["formattedDate"]= date.toString().substring(0,15);
        }
        this.message.info('Your search came back with ' + data.length + ' results');
      }else {
        this.message.info('Unfortunately our search found 0 results for your search, try again with new parameters');
      }
    })
  }

  backToSearch() : void {
    this.isVisible = true;
    this.showResults = false;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, new Date()) < 2;
  };

  handleCancel(): void {
    this.isVisible = false;
    this.showResults = true;
  }

  open(): void {
    this.isVisible = true;
    this.showResults = false;
  }

}
