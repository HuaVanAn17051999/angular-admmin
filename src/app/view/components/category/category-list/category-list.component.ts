import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/api/category.sevice';
import { Category } from '../category';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass'],
})
export class CategoryListComponent implements OnInit {
 
  @Input() category: Category[];
  
  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.getList();
    console.log(this.category);
   
  }
  getList() {
    return this.service.getAll().subscribe(data =>  {
        this.category = data;
    });
  }
  onDelete(id: number){
    return this.service.delete(id).subscribe(res => {
    })
  }
  
 
}

