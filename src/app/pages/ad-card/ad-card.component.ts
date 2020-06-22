import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { RateService } from 'src/app/services/rate.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input() result: any;
  @Input() page: string;
  @Output() messagesBoolean = new EventEmitter<any>();


  private user: any;
  commentFlag: boolean;
  rateFlag: boolean;
  commentModel: any;
  rateModel: any;
  tooltips = ['1', '2', '3', '4', '5'];
  listOfData = [];

  constructor(private router:Router,
              private message: NzMessageService,
              private rateService: RateService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.setupUser();
    this.commentFlag = false;
    this.rateFlag = false;
    this.commentModel = "";
    this.rateModel;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private setupData(id): void {
    this.commentService.getAllCommentsByAd(id).subscribe(data => {
      this.listOfData = data;
    });
  }

  seeInfo(ad: any) : void {
    localStorage.setItem("ad-detail", JSON.stringify(ad));
    this.router.navigateByUrl('dashboard/' + this.result.ad.adID + "/ad-details");
  }

  seeMessages(Ad): void {
    this.messagesBoolean.emit(Ad.agent.agentID);
  }

  rate(id): void {
    this.rateFlag = true;
    this.commentFlag = false;
    this.rateService.getAvgRatingByAd(id).subscribe(data => {
      this.message.info('Average rating: ' + data.avgRating);
    });
  }

  comment(id): void {
    this.commentFlag = true;
    this.rateFlag = false;
    this.setupData(id);
  }

  confirmComment(id): void {
    this.commentFlag = false;
    const body = {
      comment: this.commentModel,
      userId: this.user.id,
      adId: id

    }
    this.commentService.writeComment(body).subscribe(() => {
      this.message.info('You have successfully commented this ad.');
      this.commentModel = '';
    }, error => {
      console.log(error);
      this.message.info('You cannot comment this ad.');
    });
  }

  confirmRate(id): void {
    this.rateFlag = false;
    const body = {
      grade: this.rateModel,
      simpleUserId: this.user.id,
      adId: id

    }
    this.rateService.rateAd(body).subscribe(() => {
      this.message.info('You have successfully rated this ad.');
      this.rateModel = 0;
    }, error => {
      console.log(error);
      this.message.info('You cannot rate this ad.');
      this.rateModel = 0;
    });
  }

  customerFullName(name, surname, agentName): String {
    if(name === null && surname === null){
      return agentName;
    }
    return name + '' + surname;
  }
}
