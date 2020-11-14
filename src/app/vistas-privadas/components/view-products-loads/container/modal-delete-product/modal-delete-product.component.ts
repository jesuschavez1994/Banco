import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StoreService } from '../../../../../services/store/store.service';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.css']
})
export class ModalDeleteProductComponent implements OnInit {

  value = {};

  constructor(public dialogRef: MatDialogRef<ModalDeleteProductComponent>,
              public storeService: StoreService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                console.log(data);
              }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.dialogRef.close();
  }

  deleteProdtuc(){

    this.storeService.DeleteProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.data.idProducto
    ).subscribe( resp => {
    document.getElementById(this.data.indexProductoDelete).parentElement.style.display = 'none';
    this.dialogRef.close();
    });

  }

}
