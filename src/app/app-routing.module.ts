import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConferenceListContainerComponent } from './conference/conference-list-container/conference-list-container.component';
import { ConferenceModule } from './conference/conference.module';

const routes: Routes = [
    {
        path: '',
        component: ConferenceListContainerComponent
    },
    {
        path: 'admin',
        loadChildren: './views/admin/admin-views.module#AdminViewsModule'
    }
];

@NgModule({
    imports: [
        ConferenceModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
