export class SuccessResponse {
    public status: boolean;
    public data: any;
    public user: any;
    public error: any;
}

export class UserLoginModel {
    public login: string;
    public password: string;
}

export class RegistrationModel {
    public login: string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public password: string;
}