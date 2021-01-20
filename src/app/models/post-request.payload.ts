export class PostRequest {
  constructor(
    public title: string,
    public subTitle: string,
    public content: string,
    public published: boolean
  ) {}
}
