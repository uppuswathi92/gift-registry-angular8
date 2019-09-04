import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../service/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styles:[`:host >>> .popover{width: 250px !important;}`],
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
product: Product = new Product("","","",false,"","","");
products:string[];
eventId: string = "";
currentProduct: any;
  modalReference: any;
  closeResult: any;
  displaySpinner: Boolean = false;
  constructor(private productsService: ProductsService, private route: ActivatedRoute,  private modalService: NgbModal, private router: Router) { 
  this.route.queryParams.subscribe(params => {
        this.eventId = params['eventId'];
    });
  }

  ngOnInit() {
	 this.getProducts();
  }
  getProducts(): void{
	  this.displaySpinner = true;
	   this.productsService.getProducts(this.eventId).subscribe(
     response =>this.handleSuccessfulResponse(response));
  }
  handleSuccessfulResponse(response)
	{
		if(response.service === "getProducts"){
			this.displaySpinner = false;
			this.products = response.results;
		}else if(response.service === "deleteProduct"){
			this.displaySpinner = false;
			this.getProducts();
		}
		console.log(response);
	}
	
	deleteProduct(content, product): void{
		/*this.displaySpinner = true;
		this.eventsService.deleteEvent(eventId).subscribe(
     response =>this.handleSuccessfulResponse(response),
    );*/
	this.currentProduct = product;
	this.modalReference = this.modalService.open(content);
this.modalReference.result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});
	}
	
	private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }else if(reason === 'Ok click'){
		console.log("Ok click");
	}
	else {
      return  `with: ${reason}`;
    }
  }
  deleteCurrentProduct(){
	  this.displaySpinner = true;
	  console.log(this.currentProduct);
		this.productsService.deleteProduct(this.currentProduct.productId).subscribe(
     response =>this.handleSuccessfulResponse(response));
	  this.modalReference.close();
  }
  
  addProduct(){
	  this.router.navigate(["addproduct"], { queryParams: { eventId: this.eventId } });
  }

}
