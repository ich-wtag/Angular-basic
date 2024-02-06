import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-container',
  templateUrl: './conatiner.component.html',
  styleUrls: ['./conatiner.component.css'],
})
export class ContainerComponent {
  listOfStrin: string[] = ['Mark', 'Steve', 'henry'];
  searchText: string = '';

  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;
  setSearchText(value: string) {
    this.searchText = value;
  }
  // setSearchText(value : string){
  // }
  // name = 'John Doe';
  // addToCart: number = 0;
  // product = {
  //   name: 'iPhone X',
  //   price: 789,
  //   color: 'Black',
  //   discount: 8.5,
  //   inStock: 5,
  //   pImage: '/assets/images/iphone.png',
  // };

  // getDiscountedPrice() {
  //   return (
  //     this.product.price - (this.product.price * this.product.discount) / 100
  //   );
  // }
  // onNameChange(event: any) {
  //   // this.name = event.target.value;
  // }

  // decrementCartValue() {
  //   if (this.addToCart > 0) {
  //     this.addToCart--;
  //   }
  // }

  // incrementCartValue() {
  //   if (this.addToCart < this.product.inStock) {
  //     this.addToCart++;
  //   }
  // }
}
