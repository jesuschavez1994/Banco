import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { ThemePalette } from '@angular/material/core'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { Sugerir } from '@models/sincronizacion/sugerir'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Total } from '@interfaces/sincronizacion'
import { NgxSpinnerService } from 'ngx-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service'

export interface Task {
  name: string
  completed: boolean
  color: ThemePalette
  subtasks?: Task[]
}

export class Termino {
  constructor(public name: string) {}
}

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css'],
})
export class SuggestedProductsComponent implements OnInit {
  // tslint:disable-next-line: member-ordering
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  }

  @Output() public searchEmitter = new EventEmitter<string>()

  forma: FormGroup
  palabra: Total
  // Sidebar related parameters
  anchorsMenu: AnchorsMenu[] = []
  sidebarSections: SidebarSections

  constructor(
    public sincronizacion: SincronizacionService,
    private spinnerService: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private _sidebarListService: SidebarListService
  ) {}

  allComplete = false

  ngOnInit() {
    this.spinner()
  }

  spinner(): void {
    this.spinnerService.show()
  }

  solicitarSugerencias() {
    const id = new Sugerir(localStorage.getItem('storeId'))

    this.sincronizacion
      .Sugerir(localStorage.getItem('storeId'), id)
      .subscribe((resp) => {
        console.log(resp)
        this.spinnerService.hide()
      })
  }

  sugerir() {}

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null && this.task.subtasks.every((t) => t.completed)
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    )
  }

  setAll(completed: boolean) {
    this.allComplete = completed
    console.log(this.allComplete)
    if (this.task.subtasks == null) {
      return
    }
    this.task.subtasks.forEach((t) => (t.completed = completed))
  }

  buscar(termino: string) {
    console.log(termino)

    const palabra = new Termino(termino)
  }

  loadAnchorsMenuData() {
    const id = localStorage.getItem('storeId')
    this.anchorsMenu = [
      {
        anchorName: 'Contacto',
        anchorLink: `/my-store/contact`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Productos',
        anchorLink: `/my-store/product-catalogue`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Sincronización',
        anchorLink: `/my-store/sincronizacion/exportar-lista-excel`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Ventas',
        anchorLink: `/my-store/ventas`,
        wordToMatch: `products`,
      },
    ]

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu)
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: true,
    }

    this._sidebarListService.setRequiredSections(this.sidebarSections)
  }
}
