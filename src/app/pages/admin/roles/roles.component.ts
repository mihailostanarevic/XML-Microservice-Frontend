import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

export interface UserData{
  id: string;
  username: string;
  userRole: string;
  name: string;
  roleList: any;
}
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  userList: UserData;

  constructor(private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.userService.getUsersAll().subscribe(userList => {
      this.userList = userList;
    });
  }

  deleteRole(userId, roleId, name, permissionList): void {
    let permission: string;
    permissionList.forEach(permissionElement => {
      permission += permissionElement+", ";
    });
    permission = permission.substring(9, permission.length-2);
    this.modal.confirm({
      nzTitle: 'Are you sure delete role "'+ name +'"?',
      nzContent: 'Permissions: <i style="color: red;">'+permission+'</i>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.approveDelete(userId, roleId),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  approveDelete(userId, roleId): void {
    this.userService.deleteRole(userId, roleId).subscribe(userList => {
      this.userList = userList;
    });
  }

}
