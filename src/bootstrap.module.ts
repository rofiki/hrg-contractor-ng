import { NgModule } from "@angular/core";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@NgModule({
    exports: [
        ButtonsModule,
        BsDropdownModule,
    ]
})
export class BootstrapModule{}