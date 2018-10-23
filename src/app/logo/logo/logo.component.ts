import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentConfigurationService } from '../../configuration/current-configuration.service';
import { Logo } from '../logo.enum';

@Component({
    selector: 'wt-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

    logoPictureUrl$: Observable<string>;

    constructor(private _currentConfigurationService: CurrentConfigurationService) {
    }

    ngOnInit() {
        this.logoPictureUrl$ = this._currentConfigurationService.currentConfiguration$
            .pipe(
                map(configuration => {

                    const logo = configuration.logo;

                    if (logo == null || logo === Logo.None) {
                        return null;
                    }

                    return require(`./${logo}.svg`);

                })
            );
    }

}
