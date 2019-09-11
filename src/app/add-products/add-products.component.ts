import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../service/products.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-add-products',
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.css', '../../form-style.css']
})
export class AddProductsComponent implements OnInit {
    product: Product = new Product("", "", "", false, "", "", "", "");
    submitted: Boolean = false;
    productId: String = "";
    eventId: string = "";
    isUpdate: Boolean = false;
    displaySpinner: Boolean = false;
    imageUpdated: Boolean = false;
    selectedFile: any;
    constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.product.eventId = params['eventId'];
            this.eventId = params['eventId'];
            this.productId = params['productId'];
            if (this.productId) {
                this.isUpdate = true;
                this.getProductsById();
            }
        });
    }

    ngOnInit() {}

    //gets product details in edit mode
    getProductsById(): void {
        this.displaySpinner = true;
        this.productsService.getProductById(this.productId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    //invoked on click of add product
    addProduct(): void {
        this.submitted = true;
        if (this.product.productName && this.product.productLink && this.product.productColor) {
            this.displaySpinner = true;
            this.productsService.addProduct(this.product).subscribe(
                response => this.handleSuccessfulResponse(response));
        }
    }

    //invoked on click of edit product
    editProduct(): void {
        this.submitted = true;
        this.productsService.updateProduct(this.product).subscribe(
            response => this.handleSuccessfulResponse(response));
    }

    //handles response from http service
    handleSuccessfulResponse(response) {
        if (response != null) {
            if (response.service === "getProductsById") {
                this.displaySpinner = false;
                this.product = response.results;
                this.product.productImage = "data:image/jpg;base64," + response.results.productImage;
                this.eventId = this.product.eventId;
            } else if (response.service === "addProduct") {
                this.uploadImage(response.results);
            } else if (response.service === "updateProduct") {
                if (this.imageUpdated) {
                    this.product.eventId = this.eventId;
                    this.uploadImage(this.productId);
                } else {
                    this.viewProducts();
                }
            } else if (response.service === "uploadImage") {
                this.displaySpinner = false;
                this.router.navigate(["viewproduct"], {
                    queryParams: {
                        eventId: this.product.eventId
                    }
                });
            }
        }

    }

    //invoked on change of file upload
    public fileChange(event) {
        this.imageUpdated = true;
        this.selectedFile = event.target.files[0];
    }

    //invokes service that uploads product image in database
    uploadImage(productId) {
        if (this.selectedFile != null) {
            const uploadData = new FormData();
            uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
            this.productsService.uploadImage(uploadData, productId).subscribe(
                response => this.handleSuccessfulResponse(response));
        } else {
            this.displaySpinner = false;
            this.router.navigate(["viewproduct"], {
                queryParams: {
                    eventId: this.product.eventId
                }
            });
        }
    }
	//redirects to view products page
	viewProducts() {
        this.router.navigate(["viewproduct"], {
            queryParams: {
                eventId: this.eventId
            }
        });
    }
}