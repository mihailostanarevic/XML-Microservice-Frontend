import { Component, OnInit } from '@angular/core';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})
export class RegistrationRequestComponent implements OnInit {

  listOfData = [];

  constructor(private registrationRequestService: RegistrationRequestService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.registrationRequestService.getRegistrationRequests().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  confirm(id): void {
    const body = {
      id
    }
    this.registrationRequestService.confirmRegistrationRequest(body).subscribe(data => {
      this.message.info('You have successfully approved registration request.');
      this.setupData();
    })
  }

  deny(id): void {
    const body = {
      id
    }
    this.registrationRequestService.denyRegistrationRequest(body).subscribe(data => {
      this.message.info('You have successfully denied registration request.');
      this.setupData();
    })
  }
}
