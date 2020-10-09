import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService, private toastr: ToastrService,  private toast: ToastrService, private route: ActivatedRoute) { }
  public res=[];

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    return this.service.getListUser().subscribe(data => {
        this.res = (data)
        console.log('getall', data)
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this product ? ')) {
      this.service.delete(id).subscribe(res => {
        this.toast.warning('Delete successfully !');
      });
    }
  }

}
