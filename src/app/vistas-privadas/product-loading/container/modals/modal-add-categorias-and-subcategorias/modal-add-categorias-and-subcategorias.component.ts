import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-modal-add-categorias-and-subcategorias',
  templateUrl: './modal-add-categorias-and-subcategorias.component.html',
  styleUrls: ['./modal-add-categorias-and-subcategorias.component.css']
})
export class ModalAddCategoriasAndSubcategoriasComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalAddCategoriasAndSubcategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.forma = new FormGroup({
          categoria: new FormControl('', [Validators.required, Validators.minLength(5)]),
          subcategoria: new FormControl('', [Validators.required, Validators.minLength(5)]),
      });

      // tslint:disable-next-line: align
      this.forma.controls.categoria.setValue([
        this.data.nameCategory
      ]);


     }

  ngOnInit(): void {
    console.log(this.data.nameCategory);
  }

  valueInput(){
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addCategory(){
    this.dialogRef.close(this.forma);
  }

  registrarNegocio(){}

}
