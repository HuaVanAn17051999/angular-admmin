import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/api/product.sevice';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass'],
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  data: any = [];
  imgURL: any;
  URLimg: any;
  
  baseUrl = environment.BaseUrl;
  imgFileName: string;

  constructor(
    private sevice: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {
    this.editForm = this.formBuilder.group({
      Name: [Validators.required],
      Price: [Validators.required],
      OldPrice: [ Validators.required],
      Stock: [ Validators.required],
      Caption: [ Validators.required],
      CategoryId: [Validators.required],
      ImageFile: [Validators.required],
    });
  }

  ngOnInit(): void {
    this.getById();
  }
  getById() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.sevice.getById(id).subscribe(data => {
      this.data = data;
      this.imgURL = this.data.imagePath;
      this.editForm.patchValue({
        Name: this.data.name,
        Price: this.data.price,
        OldPrice: this.data.oldPrice,
        Stock: this.data.stock,
        Caption: this.data.caption,
        CategoryId: this.data.categoryId,
        ImageFile: this.data.imagePath
      });
      console.log('data', this.editForm)
    });
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('Name', this.editForm.get('Name').value);
    formData.append('Price', this.editForm.get('Price').value);
    formData.append('OldPrice', this.editForm.get('OldPrice').value);
    formData.append('Stock', this.editForm.get('Stock').value);
    formData.append('Caption', this.editForm.get('Caption').value);
    formData.append('CategoryId', this.editForm.get('CategoryId').value);
    formData.append('ImageFile', this.editForm.get('ImageFile').value);

    console.log('fdfdfd',  this.editForm.get('Name').value);

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.sevice.update(id, formData).subscribe(res => {
      this.toast.success("Update Product Successfully !");
    });
  }

  onFileSelect(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.URLimg = reader.result;
    }
    const file = event.target.files[0];
    this.editForm.get('ImageFile').setValue(file);
    this.imgFileName = event.target.files[0].name;
  }
}
