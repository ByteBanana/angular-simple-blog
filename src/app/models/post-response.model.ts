export class PostResponse {
  constructor(
    public postId: number,
    public title: string,
    public subTitle: string,
    public content: string,
    public createDate: Date,
    public lastUpdateDate: Date,
    public username: string
  ) {}
}
