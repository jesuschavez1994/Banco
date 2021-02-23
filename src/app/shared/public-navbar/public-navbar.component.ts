import { Component, OnInit, Input, AfterViewInit } from '@angular/core'
import {
  DropdownOption,
  ClassIcon,
  ExtraButtonEmitter,
} from '@interfaces/components-options/dropdown.options.interface'
import { SearchService } from '@services/Search/search.service'
import { HomeServiceService } from '../../vistas-publicas/services/home-service.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss'],
})
export class PublicNavbarComponent implements OnInit, AfterViewInit {
  @Input() userLog: boolean
  @Input() storeAct: boolean | string

  // Button DropDown - cart
  classIcon: ClassIcon = {
    class: 'fas fa-shopping-cart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323',
    },
  }
  // Button DropDown - favorite
  classIconFavorite: ClassIcon = {
    class: 'fas fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323',
    },
  }
  @Input() menuOptions: DropdownOption[] = []
  @Input() menuOptionsFavorite: DropdownOption[] = []

  constructor(
    public homeService: HomeServiceService,
    public _searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLog = this.homeService.islog()
    this.storeAct = this.homeService.storeActive()
  }

  ngAfterViewInit(): void {}

  // Handlers for events that happen in the component ----------------------
  handleSearch(searchTerm: string) {
    if (searchTerm !== '') {
      this.router.navigate(['search-results'], {
        queryParams: searchTerm !== '' ? { name: searchTerm } : {},
      })
    }
  }
}
