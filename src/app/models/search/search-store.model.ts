export class SearchStore {
    constructor(
        public name: string,
        public marks?: string[],
        public subcategories?: string[],
        public categories?,
        public factories?: string[],
        public price?: string[],
        public delivery?: any,
        public recipes?: string[]
    ) { }
}
