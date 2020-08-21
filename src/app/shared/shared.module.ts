import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { APP_ROUTING } from '../app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarToHomeComponent } from './navbar-to-home/navbar-to-home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NavbarstoreComponent } from './header/navbarstore.component';


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        NavbarToHomeComponent,
        CategoriasComponent,
        NavbarstoreComponent
    ],
    imports: [ APP_ROUTING, ],
    exports: [ NavbarComponent,  SidebarComponent, NavbarToHomeComponent, CategoriasComponent, NavbarstoreComponent]
})

export class SharedModule { }
