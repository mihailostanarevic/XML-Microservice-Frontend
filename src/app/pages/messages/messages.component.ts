import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";
import { User } from 'src/app/shared/user.model';
import { MessageService } from 'src/app/services/message.service';
import { CarAccessory } from 'src/app/shared/carAccessory.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];
  user: User;
  text: string;
  visible: boolean;
  carAccessories: CarAccessory[] = [];
  messageToReplyTo: any;
  addedText: string;

  constructor(private store: Store<fromApp.AppState>, private messageService: MessageService) { }

  ngOnInit(): void {
    this.addedText = "(";
    this.text = "";
    this.store.select("auth").subscribe(authData => {
      this.user = authData.user;
    });

    this.messageService.getMessagesForUser(this.user.id, '').subscribe( data => {
      this.messages = data;
      console.log(data);
    })

    
  }

  open(message: any): void {
    this.messageToReplyTo = message;
    console.log(this.messageToReplyTo);

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
}
