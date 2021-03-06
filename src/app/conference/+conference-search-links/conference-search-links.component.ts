import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConferenceFilter } from '../conference-filter';
import { ConferenceRepository } from '../conference-repository';
import { ConferenceSearchComponent } from '../conference-search-component';

@Component({
    selector: 'wt-conference-search-links',
    templateUrl: './conference-search-links.component.html',
    styleUrls: ['./conference-search-links.component.scss']
})
export class ConferenceSearchLinksComponent implements ConferenceSearchComponent {

    @Input() conferenceFilter: ConferenceFilter;
    @Output() conferenceFilterChange = new EventEmitter<ConferenceFilter>();

    topicList = this._conferenceRepository.topicList;

    constructor(private _conferenceRepository: ConferenceRepository) {
    }

    selectTopic(topicId: string) {

        this.conferenceFilterChange.emit(new ConferenceFilter({
            ...this.conferenceFilter || {},
            topicId
        }));

    }

}
