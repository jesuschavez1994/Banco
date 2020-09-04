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
        public adress_latitude?: string,
        // tslint:disable-next-line: variable-name
        public adress_longitude?: string,

    ) { }

}
