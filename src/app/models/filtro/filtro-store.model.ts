export class FiltroStore {
    constructor(
        public name: string,
        public marks?: string[],
        public subcategories?: string[],
        public categories?: string[],
        public factories?: string[],
        public price?: string[],
        public delivery?: any,
        public recipes?: string[]
    ) { }
}