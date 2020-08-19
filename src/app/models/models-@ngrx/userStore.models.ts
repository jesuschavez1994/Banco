export class UserStore {

    public name: string;
    public id: string;
    public email: string;

    constructor(obj: Database ){
        this.name = obj && obj.name || null;
        this.id = obj && obj.id || null;
        this.email = obj && obj.email || null;
    }
}

interface Database {
    name: string;
    id: string;
    email: string;

}
