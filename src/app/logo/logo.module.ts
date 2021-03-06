import { NgModule } from '@angular/core';
import { CirclePictureModule } from '../../lib/circle-picture/circle-picture.module';
import { SharedModule } from '../shared/shared.module';
import { LogoComponent } from './logo/logo.component';

@NgModule({
    declarations: [
        LogoComponent
    ],
    exports: [
        LogoComponent
    ],
    imports: [
        CirclePictureModule,
        SharedModule
    ]
})
export class LogoModule {
}
