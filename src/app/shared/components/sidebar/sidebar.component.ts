import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/api/category.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  category=[];
  getid = '';

  constructor(private service : CategoryService, private router: Router) {
   this.getList();
   }

  ngOnInit(): void {
     console.log(this.category)
     console.log(this.getid)
  } 

  getList() {
    return this.service.getAll().subscribe(data =>  {
        this.category = data;
    });
  }
  getChild(){
      
  }
  // seleteItem(child){
  //   this.router.navigate(['/product',child.seotitle, child.id])
  // }
  

}
