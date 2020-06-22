import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-pending-comments',
  templateUrl: './pending-comments.component.html',
  styleUrls: ['./pending-comments.component.css']
})
export class PendingCommentsComponent implements OnInit {

  listOfData = [];

  constructor(private commentService: CommentService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.commentService.getAllPendingComments().subscribe(data => {
      this.listOfData = data;
    })
  }

  approve(id): void {
    const body = {
      commentId: id
    }
    this.commentService.approveComment(body).subscribe(() => {
      this.message.info('You have successfully approved comment request.');
      this.setupData();
    });
  }

  deny(id): void {
    const body = {
      commentId: id
    }
    this.commentService.denyComment(body).subscribe(() => {
      this.message.info('You have successfully denied comment request.');
      this.setupData();
    });
  }

  customerFullName(name, surname): String {
    return name + '' + surname;
  }
}
