export class UserStore {

    constructor(
        public name: string,
        public email: string,
        // tslint:disable-next-line: variable-name
        public phone?: string,
        public password1?: string,
        public password2?: string
    ) { }

}
