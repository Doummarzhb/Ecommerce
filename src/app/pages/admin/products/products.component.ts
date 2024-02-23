import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible:boolean=false; //true bytl3 newproduct
  productObj:any = {
    "productId":0,
    "productSku":"",
    "productName":"",
    "productprice":0,
    "productShortName":"",
    "productDescription":"",
    "createdDate":new Date(),
    "deliveryImeSpan":"",
    "categoryId":"",
    "productImageUrl":""
  };
  categoryList:any []=[];
  productsList:any []=[];
  constructor(private productSrv: ProductService) {

  }

  ngOnInit(): void {
this.getAllCategory();
this.getProducts();
  }
  getProducts(){
    this.productSrv.getProducts().subscribe((res:any) => {
      this.productsList =res.data;
    })
  }
  onSave(){
    this.productSrv.UpdateProduct(this.productObj).subscribe((res:any) =>{
      if(res.result){
        alert("Product update ");
        this.getProducts();
      }else {
        alert(res.message);

      }
    })
  }
onUpdate(){
  this.productSrv.saveProduct(this.productObj).subscribe((res:any) =>{
    if(res.result){
      alert("Product Created ");
      this.getProducts();
    }else {
      alert(res.message);

    }
  })
}
onDelete(item:any){
  const isDelete=confirm('Are you sure want to delete');
  if(isDelete){
    this.productSrv.deleteProduct(item.productId).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert('product Delete ');
        this.getProducts();

      }else {
        alert(res.message);
      }
    })
  }
}
  onEdit(item:any){
this.productObj=item;
this.openSidePanel();
  }
  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any) => {
      this.categoryList=res.data;
    })
  }

  openSidePanel(){
    this.isSidePanelVisible=true;
  }
  closeSidePanel(){
    this.isSidePanelVisible =false;
  }
}
