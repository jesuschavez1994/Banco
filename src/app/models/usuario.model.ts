export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public username: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public id?: string
    ) { }

}
