export class CommentResponse {
  constructor(
    public username: string,
    public createDate: Date,
    public commentId: number,
    public message: string,
    public postId: number
  ) {}
}
