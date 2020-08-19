export class Negocio {

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string = 'store',
        public img?: string,
        public google?: boolean,
        public id?: string
    ) { }

}
