import { Component, OnInit } from '@angular/core';
import { PurchaseCoordinatorPurchaseOrderService } from './purchase-coordinator-purchase-order.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-coordinator-purchase-order',
  templateUrl: './purchase-coordinator-purchase-order.component.html',
  styleUrls: ['./purchase-coordinator-purchase-order.component.css']
})
export class PurchaseCoordinatorPurchaseOrderComponent implements OnInit{

  grns: any[] = [];
  filteredGrns: any[] = [];
  fillGrns: any[] = [];
  searchValue: string = '';

  constructor(private _dialog: MatDialog, private productService: PurchaseCoordinatorPurchaseOrderService) {}
  ngOnInit(): void {
    this.productService.getGrn().subscribe(gin => {
      this.grns = gin;
      this.filterGrns();
      this.filteredGrns = this.fillGrns;
    });
  }

  filterGrns() {
    this.fillGrns = this.grns.filter(grn => {
      // Filter grn based on category_id
      return grn.category_id === 'staron';
    });
  }

  searchGrns(): void {
    this.filteredGrns = this.fillGrns.filter(grn => {
      const searchDet = `${grn.date}`;
      return searchDet.toLowerCase().includes(this.searchValue.toLowerCase());
    });
  }
  
  reduceQuantity(product_name: string, product_brand: string, product_quantity: number): void {
    this.productService.reduceProductQuantity(product_name, product_brand, product_quantity).subscribe(() => {
      alert('Product quantity updated successfully');
    }, error => {
      alert('Error updating product quantity');
      console.error(error);
    });
  }

  onSubmit(formValue: any): void {
    this.reduceQuantity(formValue.product_name, formValue.product_brand, formValue.product_quantity);
  }
}
