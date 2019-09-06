import {
    Component,
    OnInit
} from '@angular/core';
import {
    ProductsService,
    Product
} from '../service/products.service';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

@Component({
    selector: 'app-add-products',
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.css', '../../form-style.css']
})
export class AddProductsComponent implements OnInit {
    product: Product = new Product("", "", "", false, "", "", "", "");
    submitted: Boolean = false;
    productId: String = "";
    eventId: String = "";
    isUpdate: Boolean = false;
    displaySpinner: Boolean = false;
    uploadInfo: any;
    imageUpdated: Boolean = false;
    /**file code **/
    title = 'ImageUploaderFrontEnd';

    public selectedFile: any;
    public event1;
    imgURL: any;
    receivedImageData: any;
    base64Data: any;
    convertedImage: any;
    productImage: String = "";

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

    ngOnInit() {
        //this.getImage();
    }
    getImage() {
        this.productsService.getImage().subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }

    getProductsById(): void {
        this.displaySpinner = true;
        this.productsService.getProductById(this.productId).subscribe(
            response => this.handleSuccessfulResponse(response),
        );
    }
    addProduct(): void {
        this.submitted = true;
        const uploadData = new FormData();
        //uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        console.log(uploadData);
        //this.product.productImage = uploadData;
        if (this.product.productName && this.product.productLink && this.product.productColor) {
            this.displaySpinner = true;
            this.productsService.addProduct(this.product).subscribe(
                response => this.handleSuccessfulResponse(response));
        }
    }
    editProduct(): void {
        this.submitted = true;
        this.productsService.updateProduct(this.product).subscribe(
            response => this.handleSuccessfulResponse(response));
    }
    handleSuccessfulResponse(response) {
        console.log(response);
        if (response != null) {
            if (response.service === "getProductsById") {
                this.displaySpinner = false;
                this.product = response.results;
                this.product.productImage = "data:image/jpg;base64," + response.results.productImage;
                this.eventId = this.product.eventId;
            } else if (response.service === "addProduct") {
                this.uploadHere(response.results);
            } else if (response.service === "updateProduct") {
				if(this.imageUpdated){
					this.product.eventId = this.eventId;
					this.uploadHere(this.productId);
				}else{
					this.viewProducts();
				}
            } else if (response.service === "uploadImage") {
                //this.productImage = "data:image/jpg;base64,"+response;
                this.displaySpinner = false;
                this.router.navigate(["viewproduct"], {
                    queryParams: {
                        eventId: this.product.eventId
                    }
                });
            }
        }

    }

    /**file code **/
    public fileChange(event) {

        this.imageUpdated = true;
        this.selectedFile = event.target.files[0];

        // Below part is used to display the selected image
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2) => {
            this.imgURL = reader.result;
            const uploadData = new FormData();
            uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
            const uploadData1 = new FormData();
            uploadData1.append('productId', this.selectedFile, "12345");
            this.uploadInfo = new FormData();
            this.uploadInfo.append('myFile', this.selectedFile, this.selectedFile.name);
            //this.uploadInfo.append('productId', this.selectedFile, "12345");
            console.log(uploadData);
            /*this.productsService.upload(uploadData,uploadData1).subscribe(
            response => this.handleSuccessfulResponse(response));

	// this.httpClient.post(url,formData).subscribe(res => console.log('File Uploaded ...');
    } */

        }


    }

    uploadHere(productId) {
        console.log(productId);
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        this.productsService.uploadImage(uploadData, productId).subscribe(
            response => this.handleSuccessfulResponse(response));

        // this.httpClient.post(url,formData).subscribe(res => console.log('File Uploaded ...');
    }

    /** file code **/

    viewProducts() {
        this.router.navigate(["viewproduct"], {
            queryParams: {
                eventId: this.eventId
            }
        });
    }
}