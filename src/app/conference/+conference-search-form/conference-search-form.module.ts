import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ReactiveComponentLoaderModule } from '@wishtack/reactive-component-loader';
import { ConferenceSearchFormComponent } from './conference-search-form.component';

@NgModule({
    declarations: [
        ConferenceSearchFormComponent
    ],
    entryComponents: [
        ConferenceSearchFormComponent
    ],
    exports: [
        ConferenceSearchFormComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveComponentLoaderModule,
        ReactiveFormsModule
    ]
})
export class ConferenceSearchFormModule {
}
