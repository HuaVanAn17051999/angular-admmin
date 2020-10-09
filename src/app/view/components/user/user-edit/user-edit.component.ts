import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/api/role.service';

import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
})
export class UserEditComponent implements OnInit {
  public data: any;
  public editForm: FormGroup;
  public role: any;
  public roles: any;
  public checkedTickets = [];
  public id: number;
   

  form: FormGroup;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roleService: RoleService,
    private toast: ToastrService
  ) {

    this.form = this.fb.group({
      Role: this.fb.array([], [Validators.required]),
      FirstName: [Validators.required],
      LastName: [Validators.required],
      UserName: [Validators.required],
      Email: [Validators.required],
      Id: this.route.snapshot.paramMap.get('id'),
      Roles: [Validators.required]
    });
  }

  ngOnInit(): void {
    this.getById();
    this.listRole();
    this.addRole();
    console.log('a', this.roles);
  }

   getById() {
    let id = parseInt( this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.service.getById(id).subscribe((data) => {
      this.data = data;
      this.roles = data.role;
      console.log('bbbbbb', this.roles)

      console.log('fdfafdfsfsfsdf', this.data);

      this.form.patchValue({
        FirstName: this.data.firstName,
        LastName: this.data.lastName,
        UserName: this.data.userName,
        Email: this.data.email,
        Roles: this.data.role
      });
    });
  }

  listRole() {
    this.roleService.listRole().subscribe((res) => {
      this.role = res;
    });
  }

  onSubmit() {
    console.log('data', this.form.value);
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.update(id, this.form.value).subscribe(res => {
      this.toast.success('Update Successfully !!!');
    })
  }

  addRole(){
    if(this.roles != null) {
      const checkArray: FormArray = this.form.get('Role') as FormArray;
      checkArray.push(this.roles);
      console.log('ab', checkArray);
    }
    else {
      console.log('a', this.roles);
    }
  }

  // onCheck(evt) {
  //   if (!this.checkedTickets.includes(evt)) {
  //     this.checkedTickets.push(evt);
  //     console.log('datafdfdf', this.checkedTickets);
  //   } else {
  //     var index = this.checkedTickets.indexOf(evt);
  //     if (index > -1) {
  //       this.checkedTickets.splice(index, 1);
  //     }
  //   }
  // }

  onCheckboxChange(e) {
    console.log('e', e.target.value)
    const checkArray: FormArray = this.form.get('Role') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        console.log('item', item);
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
