import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../service/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-purchase-product',
    templateUrl: './purchase-product.component.html',
    styleUrls: ['./purchase-product.component.css', '../view-products/view-products.component.css']
})
export class PurchaseProductComponent implements OnInit {
    product: Product = new Product("", "", "", false, "", "", "","");
    products: string[];
    eventId: string = "";
    username: string = "";
    constructor(private productsService: ProductsService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
        });
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.getProducts();
    }

    getProducts() {
        this.productsService.getProducts(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response));
    }
    handleSuccessfulResponse(response) {
        if (response.service == "getProducts") {
            this.products = response.results;
			for(var i = 0;i<response.results.length;i++){
				response.results[i].productImage = "data:image/jpg;base64,"+response.results[i].productImage;
			}
			this.products = response.results;
        } else if (response.service == "purchaseProduct") {
            this.getProducts();
        }

        console.log(response);
    }
    purchaseProduct(productId) {
        this.product.isPurchased = true;
        this.product.productId = productId;
        this.product.eventId = this.eventId;
        this.product.purchasedBy = localStorage.getItem('username');
        console.log(this.product);
        this.productsService.purchaseProduct(this.product).subscribe(
            response => this.handleSuccessfulResponse(response));

    }
}