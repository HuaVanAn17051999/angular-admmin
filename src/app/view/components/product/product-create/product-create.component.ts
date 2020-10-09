import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/api/product.sevice';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/api/category.sevice';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.sass'],
})
export class ProductCreateComponent implements OnInit {
  addForm: FormGroup;
  categoryId : number;
  public imagePath;
  imgURL: any;
  public message: string;
  public imgFileName: string;

  constructor(
    private service: ProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.addForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      OldPrice: ['', Validators.required],
      Stock: ['', Validators.required],
      Caption: ['', Validators.required],
      CategoryId: ['', Validators.required],
      ImageFile: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategoryId();
  }

  getCategoryId(){
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.addForm.patchValue({
      CategoryId : id
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('Name', this.addForm.get('Name').value);
    formData.append('Price', this.addForm.get('Price').value);
    formData.append('OldPrice', this.addForm.get('OldPrice').value);
    formData.append('Stock', this.addForm.get('Stock').value);
    formData.append('Caption', this.addForm.get('Caption').value);
    formData.append('CategoryId', this.addForm.get('CategoryId').value);
    formData.append('ImageFile', this.addForm.get('ImageFile').value);
    formData.append('CategoryId', this.addForm.get('CategoryId').value);
    
    this.service.insert(formData).subscribe((res) => {
      this.toast.success("Insert Product Successfully !");
    });
  }

  onFileSelect(event) {
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    const file = event.target.files[0];
    this.addForm.get('ImageFile').setValue(file);
    this.imgFileName = event.target.files[0].name;
  }
}

