import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { APP_ROUTING } from '../app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
    ],
    imports: [ APP_ROUTING, ],
    exports: [ NavbarComponent,  SidebarComponent]
})

export class SharedModule { }
