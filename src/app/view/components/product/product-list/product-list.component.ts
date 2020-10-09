import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/api/product.sevice';
import { environment } from 'src/environments/environment';
import { Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  baseUrl = environment.BaseUrl;
  public pageNumber: number = 1;
  public Count: number;
  public categoryId: any;
  public data = [];
  public seotitle: string;

  @Output() getPrentIdEvent: EventEmitter<number> = new EventEmitter();

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.ListProductByCategoryId();
    this.baseUrl;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    }
  }
  ListProductByCategoryId() {
    let id = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.categoryId = id;
    this.seotitle = this.route.snapshot.queryParamMap.get('seotitle');

    return this.service.ListProductByCategoryId(id).subscribe(data => {
      this.data = data;
    });
  }
  createProduct() {
    this.router.navigate(['/'])
  }
  sendCategoryId() {
    this.router.navigate(['/dashboard/product-create'], { queryParams: { seotitle: this.seotitle, cateogryid: this.categoryId } });
  }
  onDelete(id: number) {
    let idPrent = parseInt(this.route.snapshot.queryParamMap.get('id'));
    if (confirm('Are you sure to delete this product ? ')) {
      this.service.delete(id).subscribe(res => {
        this.toast.warning('Delete successfully !')
      });
    }
  }
}
