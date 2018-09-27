/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

import {
    ComponentFactory,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    Injector,
    NgModuleFactory,
    NgModuleFactoryLoader,
    Type
} from '@angular/core';
import { defer, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { DYNAMIC_COMPONENT_MODULE_REGISTRY, ModuleRegistryItem } from './_internals';

export interface ComponentLocation {
    moduleId: string;
    selector: string;
}

export interface ComponentRecipe<T> {
    componentType: Type<T>;
    ngModuleFactory: NgModuleFactory<any>;
}

export function moduleNotFoundError(moduleId: string) {
    return new Error(`Module with id '${moduleId}' not found.`);
}

export function componentNotFoundError(selector: string) {
    return new Error(`Component '<${selector}>' not found.`);
}

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentLoader {

    constructor(
        @Inject(DYNAMIC_COMPONENT_MODULE_REGISTRY) private _moduleRegistry: ModuleRegistryItem[],
        private _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _ngModuleFactoryLoader: NgModuleFactoryLoader
    ) {
    }

    getComponentRecipe<T = any>({moduleId, selector}: ComponentLocation): Observable<ComponentRecipe<T>> {

        return defer(() => {

            /* @TODO: Trigger error if multiple modules with same id and different pathes. */
            const moduleRegistryItem = this._moduleRegistry
                .find(_moduleRegistryItem => _moduleRegistryItem.moduleId === moduleId);

            if (moduleRegistryItem == null) {
                throw moduleNotFoundError(moduleId);
            }

            const promise = this._ngModuleFactoryLoader.load(moduleRegistryItem.modulePath)
                .then(ngModuleFactory => {

                    const moduleRef = ngModuleFactory.create(this._injector);

                    const componentFactoryResolver = moduleRef.componentFactoryResolver;

                    const value = Array.from(componentFactoryResolver['_factories']
                        .values() as Array<ComponentFactory<any>>)
                        .find(_value => _value.selector === selector);

                    if (value == null) {
                        throw componentNotFoundError(selector);
                    }

                    const componentType = value.componentType;

                    return {
                        componentType,
                        ngModuleFactory
                    };

                });

            return fromPromise(promise);

        });

    }

}