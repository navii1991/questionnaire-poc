export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}
  
export interface Comment extends Post {
  postId: number;
  email: string;
}