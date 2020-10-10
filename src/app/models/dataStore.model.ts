export class DataStore {

    constructor(
        // tslint:disable-next-line: variable-name
        public social_reason?: string,
        public rut?: string,
        public name?: string,
        public description?: string,
        // tslint:disable-next-line: variable-name
        public email_1?: string,
        // tslint:disable-next-line: variable-name
        public email_2?: string,
        // tslint:disable-next-line: variable-name
        public phone_1?: string,
        // tslint:disable-next-line: variable-name
        public phone_2?: string,
        public webside?: string,
        public direction?: string,
        public facebook?: string,
        public instagram?: string,
        public twitter?: string,
        // tslint:disable-next-line: variable-name
        public address_latitude?: string,
        // tslint:disable-next-line: variable-name
        public address_longitude?: string,

    ) { }

}

export class Shedules {
    constructor(
        public schedules?: any[],
    ){}
}

export class DetalleProduct {
    constructor(
        // tslint:disable-next-line: variable-name
        public name: string,
        public description?: string,
        // tslint:disable-next-line: variable-name
        public price?: string,
        // tslint:disable-next-line: variable-name
        public mark?: string,
        // tslint:disable-next-line: variable-name
        public factory?: string,
        // tslint:disable-next-line: variable-name
        public category?: string,
        // tslint:disable-next-line: variable-name
        public subcategory_id?: string,
        public delivery?: string,
        public aviable?: string,
        public stock?: string,
        public recipe?: string,
        // tslint:disable-next-line: variable-name
        public file?: string,
        // tslint:disable-next-line: variable-name
        public address_longitude?: string,

    ) { }
}

export class ImgLoad {

    constructor(
        public images: any,
    ) { }

}
