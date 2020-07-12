import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";
import { User } from 'src/app/shared/user.model';
import { CarAccessory } from 'src/app/shared/carAccessory.model';
import { MessageService } from 'src/app/services/message.service';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  usersReservedRequests: any[] = [];
  userID: string;
  page: string = "reservations";

  constructor(private requestService: RequestService, private userService: UserService, private store: Store<fromApp.AppState>, private messageService: MessageService) { }
  messages: any[] = [];
  user: User;
  text: string;
  visible: boolean;
  carAccessories: CarAccessory[] = [];
  messageToReplyTo: any;
  addedText: string;
  messagesVisible: boolean;

  ngOnInit(): void {
    this.messagesVisible = false;
    this.addedText = "(";
    this.text = "";
    this.store.select("auth").subscribe(authData => {
      this.user = authData.user;
      this.requestService.getRequestsByUser(this.user.id).subscribe(data => {
        this.usersReservedRequests = data;
        for(let result of data){
          let month = parseInt(result.ad.creationDate.split("-")[1]) - 1;
          let date = new Date(result.ad.creationDate.split("-")[0],month,result.ad.creationDate.split("-")[2]);
          result.ad["formattedDate"]= date.toString().substring(0,15);
        }
      })
    });

    localStorage.setItem("page-leading-to-details", this.page);
    this.page = 'reservations';
  }

  open(message: any): void {
    this.messageToReplyTo = message;

    for(let oneMessage of this.messages){
      if(oneMessage["id"] === message["id"]){
        this.carAccessories = oneMessage["carAccessories"];
      }
    }

    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  sendMessage(): void {

    const body = {
      text: this.text + " " + this.addedText,
      sender: this.user.id,
      receiver: this.messageToReplyTo["user"].id,
      ad: this.messageToReplyTo["ad"].adID,
      accessories: []
    }

    this.messageService.sendMessage(body).subscribe();
  }

  denyEquipment(accessory: CarAccessory): void {
    this.addedText += "Accessory: " + accessory.description + ' has been denied';
    this.carAccessories.splice(this.carAccessories.indexOf(accessory),1);

    if(this.carAccessories.length === 0){
      this.addedText += ")";
    }else {
      this.addedText += " | ";
    }

    let body = {
      id: accessory.messageAccessoryID,
      approved: false
    }

    console.log(body);
    this.messageService.approveDenyAccessory(body).subscribe();
  }

  approveEquipment(accessory: CarAccessory): void {
    this.addedText += "Accessory: " + accessory.description + ' has been approved';
    this.carAccessories.splice(this.carAccessories.indexOf(accessory),1);

    if(this.carAccessories.length === 0){
      this.addedText += ")";
    }else {
      this.addedText += " | ";
    }

    let body = {
      id: accessory.messageAccessoryID,
      approved: true
    }

    console.log(body);
    this.messageService.approveDenyAccessory(body).subscribe();
  }

  seen(message:any){
    console.log(message);
    if(message["seen"] === false){
      for(let oneMessage of this.messages){
        if(oneMessage["id"] === message["id"]){
          oneMessage["seen"] = true;
        }
      }

      this.messageService.seen(message["id"]).subscribe();
    }
  }

  backToReservations(): void {
    this.messagesVisible = false;
  }

  async openMessages(adID): Promise<any> {
    await this.messageService.getMessagesForUser(this.user.id, adID).subscribe( data => {
      this.messages = data;
    })

    this.messagesVisible = true;
  }
}
