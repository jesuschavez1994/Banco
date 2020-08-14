import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { APP_ROUTING } from '../app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarToHomeComponent } from './navbar-to-home/navbar-to-home.component';


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        NavbarToHomeComponent,
    ],
    imports: [ APP_ROUTING, ],
    exports: [ NavbarComponent,  SidebarComponent, NavbarToHomeComponent]
})

export class SharedModule { }
