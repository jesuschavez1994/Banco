import {Category} from '@interfaces/components-options/sidebar-list.options.interface';

export class SearchStore {
    constructor(
        public name: string,
        public marks?: string[],
        public subcategories?: string[],
        public categories?: Category[],
        public factories?: string[],
        public price?: string[],
        public delivery?: any,
        public recipes?: string[]
    ) { }
}
