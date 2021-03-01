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
  spinner = false;
  deleteOk = false;
  ErrorMessage = false;
  idElementDelete: string;

  constructor(public dialogRef: MatDialogRef<ModalDeleteProductComponent>,
              public storeService: StoreService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                console.log(data);
                this.idElementDelete = this.data.indexProductoDelete
              }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.dialogRef.close();
  }

  deleteProdtuc(){

    this.spinner = true;

    this.storeService.DeleteProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.data.idProducto
    ).subscribe( resp => {
      this.spinner = false;
      this.deleteOk = true;
      // let parent = document.getElementById(this.data.indexProductoDelete).parentElement.style.display = 'none';
      // console.log(parent);
      this.dialogRef.close();
    });

  }

}
