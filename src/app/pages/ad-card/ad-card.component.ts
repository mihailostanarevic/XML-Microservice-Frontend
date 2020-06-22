import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() result: any;
  @Input() page: string;
  @Output() messagesBoolean = new EventEmitter<any>();

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.result);
  }

  seeInfo(ad: any) : void {
    localStorage.setItem("ad-detail", JSON.stringify(ad));
    this.router.navigateByUrl('dashboard/' + this.result.ad.adID + "/ad-details");
  }

  seeMessages(Ad): void {
    this.messagesBoolean.emit(Ad.agent.agentID);
  }
}
