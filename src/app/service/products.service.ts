import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class Product {
    constructor(
        public productName: string,
        public productLink: string,
        public productColor: string,
        public isPurchased: Boolean,
        public purchasedBy: string,
        public productId: string,
        public eventId: string,
		public productImage:string
    ) {}
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private httpClient: HttpClient) {}

    public addProduct(product) {
        return this.httpClient.post < Product > ("http://localhost:8080/products", product);
    }
    public getProducts(eventId) {
        return this.httpClient.get < Object > ("http://localhost:8080/products/getProducts/" + eventId);
    }
    public getProductById(productId) {
        return this.httpClient.get < Object > ("http://localhost:8080/products/getProductsById/" + productId);
    }
    public updateProduct(product) {
        return this.httpClient.post < Object > ("http://localhost:8080/products/updateProduct", product);
    }
    public purchaseProduct(product) {
        return this.httpClient.post < Object > ("http://localhost:8080/products/purchaseProduct", product);
    }
    public deleteProduct(productId) {
        return this.httpClient.delete < Object > ("http://localhost:8080/products/deleteProduct/" + productId);
    }
	public uploadImage(uploadData, productId) {
		const requestOptions: Object = {
            responseType: 'text'
        }
        return this.httpClient.post < Object > ("http://localhost:8080/products/uploadImage/"+productId, uploadData);
    }
    public upload(uploadData) {
		const requestOptions: Object = {
            responseType: 'text'
        }
        return this.httpClient.post < Object > ("http://localhost:8080/filetest/", uploadData,requestOptions);
    }
    public getImage() {
        const requestOptions: Object = {
            responseType: 'text'
        }
        return this.httpClient.get < any > ("http://localhost:8080/filetest/getImage", requestOptions);
    }
}