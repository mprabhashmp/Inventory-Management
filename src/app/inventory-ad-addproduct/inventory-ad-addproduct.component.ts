import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryAdAddproductService } from './inventory-ad-addproduct.service';
import { InventoryAdProductPopupComponent } from '../inventory-ad-product-popup/inventory-ad-product-popup.component';



@Component({
  selector: 'app-inventory-ad-addproduct',
  templateUrl: './inventory-ad-addproduct.component.html',
  styleUrls: ['./inventory-ad-addproduct.component.css']
})
export class InventoryAdAddproductComponent implements OnInit{

  products: any[] = [];
  
  constructor(private _dialog: MatDialog,  private productService: InventoryAdAddproductService){}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(product => {
      this.products = product;
  });
  }

 

  openAddEditProductForm(author: any, operation: String) {
    var dialogRef = null as any;
    if (operation === 'add') {
      dialogRef = this._dialog.open(InventoryAdProductPopupComponent);
    }
  
  }

}
