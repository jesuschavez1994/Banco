export class Usuario {

    constructor(
        public username: string,
        public name: string,
        public email: string,
        public password?: string,
        public phone?: string,
        public google?: boolean,
        public id?: string,
        public role: string = 'store',
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
        public rut?: string,
        public description?: string,
        // tslint:disable-next-line: variable-name
        public social_reason?: string,

    ) { }

}
