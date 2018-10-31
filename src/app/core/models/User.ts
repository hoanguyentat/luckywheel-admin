export class User {

    constructor(user) {
        {
            this.shopid = user.shopid || null;
            this.token = user.token || null;
        }
    }

    shopid: number;
    token: string;
}