import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../service/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-purchase-product',
    templateUrl: './purchase-product.component.html',
    styleUrls: ['./purchase-product.component.css', '../view-products/view-products.component.css']
})
export class PurchaseProductComponent implements OnInit {
    product: Product = new Product("", "", "", false, "", "", "", "");
    products: string[];
    eventId: string = "";
    username: string = "";
    displaySpinner: Boolean = false;
    constructor(private productsService: ProductsService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.eventId = params['eventId'];
        });
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.getProducts();
    }

    //get list of products for the event
    getProducts() {
        this.productsService.getProducts(this.eventId).subscribe(
            response => this.handleSuccessfulResponse(response));
    }

    //handles response from http service
    handleSuccessfulResponse(response) {
        if (response.service == "getProducts") {
            this.products = response.results;
            for (var i = 0; i < response.results.length; i++) {
                response.results[i].productImage = "data:image/jpg;base64," + response.results[i].productImage;
            }
            this.products = response.results;
        } else if (response.service == "purchaseProduct") {
            this.displaySpinner = false;
            this.getProducts();
        }
    }

    //invoked on click of purchase product
    purchaseProduct(productId) {
        this.displaySpinner = true;
        this.product.isPurchased = true;
        this.product.productId = productId;
        this.product.eventId = this.eventId;
        this.product.purchasedBy = localStorage.getItem('username');
        this.productsService.purchaseProduct(this.product).subscribe(
            response => this.handleSuccessfulResponse(response));

    }
}