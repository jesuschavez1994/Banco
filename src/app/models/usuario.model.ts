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
    ) { }

}
