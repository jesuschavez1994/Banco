/* 
  Service created with the purpose of sharig the data of the products that customer wants to sync between the corresponding components.
*/
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

interface ProductToSync {
  bank_id: number
  product_id: number
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class SyncProductsDataService {
  // Observable sources of information
  private actualProductSource = new Subject<ProductToSync>()
  private selectedProductSource = new Subject<ProductToSync>()
  private filterProductSource = new Subject<ProductToSync>()
  private bulkSynchroSource = new Subject<ProductToSync[]>()

  // Observable streams
  actualProduct$ = this.actualProductSource.asObservable()
  selectedProduct$ = this.selectedProductSource.asObservable()
  filterProduct$ = this.filterProductSource.asObservable()
  bulkSynchro = this.bulkSynchroSource.asObservable()

  // Service commands
  updateActualProduct(product: ProductToSync) {
    this.actualProductSource.next(product)
    console.log('Product updated to')
    console.log(product)
  }

  getSelectedProduct(product: ProductToSync) {
    this.selectedProductSource.next(product)
  }

  filterProduct(product: ProductToSync) {
    this.filterProductSource.next(product)
  }
}
