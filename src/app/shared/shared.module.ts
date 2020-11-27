import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { APP_ROUTING } from '../app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarToHomeComponent } from './navbar-to-home/navbar-to-home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NavbarstoreComponent } from './header/navbarstore.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        NavbarToHomeComponent,
        CategoriasComponent,
        NavbarstoreComponent,
        SidebarMenuComponent
    ],
    imports: [ APP_ROUTING, PipesModule, CommonModule],
    exports: [ NavbarComponent,  SidebarComponent, NavbarToHomeComponent, CategoriasComponent, NavbarstoreComponent, SidebarMenuComponent]
})

export class SharedModule { }
