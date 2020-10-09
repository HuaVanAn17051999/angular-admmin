import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/api/category.sevice';
import { from } from 'rxjs';
import { Category } from '../category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

  arr=[];
   

  constructor(private service: CategoryService) {
  
   }

  ngOnInit(): void {
   
    this.getAll();
    
  }
  
  getAll(){
    return this.service.getAll().subscribe(data =>{
       const result = data.filter(x => x.parentId == 0);
       this.arr = result
       console.log(this.arr)
    });
  }
  onSubmit(form){
    return this.service.insert(form.value).subscribe(res =>{
      console.log("Them moi thanh cong.");
    })
  }

 
  

}
