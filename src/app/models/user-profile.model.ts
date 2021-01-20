export class UserProfilePayload {
  constructor(
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string
  ) {}
}
