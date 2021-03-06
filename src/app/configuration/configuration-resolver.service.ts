/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck, publishReplay, refCount, tap } from 'rxjs/operators';
import { Condition } from '../rule-condition/condition';
import { ConditionRegistry } from '../rule-condition/condition-registry';
import { RuleRepository } from '../rule/rule-repository';
import { Configuration } from './configuration';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationResolver {

    currentConfiguration$: Observable<Configuration>;

    constructor(
        private _conditionRegistry: ConditionRegistry,
        private _ruleRepository: RuleRepository
    ) {

        this.currentConfiguration$ = this._ruleRepository.watchRuleList()
            .pipe(
                tap(console.log),
                map(ruleList => {

                    return ruleList
                    /* Only keep matching rules. */
                        .filter(rule => this._verifyCondition(rule.condition))
                        /* Grab each rule's configuration. */
                        .map(rule => rule.configuration)
                        /* Merge all configurations. */
                        .reduce((mergedConfiguration, configuration) => {

                            /* Remove undefined values.
                             * e.g.: {a: 1, b: undefined, c: null, d: 2} => {a: 1, d: 2}. */
                            const configurationData = Object.assign({}, ...Object.entries(configuration)
                                .filter(([key, value]) => value != null)
                                .map(([key, value]) => ({[key]: value})));

                            return new Configuration({
                                ...mergedConfiguration,
                                ...configurationData
                            });

                        }, new Configuration());

                }),
                tap(console.log),
                publishReplay(1),
                refCount()
            );

    }

    watchConfigurationProperty(propertyName: keyof Configuration): Observable<any> {
        return this.currentConfiguration$
            .pipe(
                pluck(propertyName),
                distinctUntilChanged()
            );
    }

    private _verifyCondition(condition: Condition) {

        /* If there's no condition then the condition is applied. */
        if (condition == null) {
            return true;
        }

        return this._conditionRegistry.getConditionVerifier(condition.type).verify(condition);

    }

}
