import { Injectable } from '@angular/core';
import { AddBlogPost } from '../../blog-post/models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UpdateBlogPost } from '../../blog-post/models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

constructor(private http:HttpClient) { }


  getAllBlogPosts() : Observable<BlogPost[]>
  {
return this.http.get<BlogPost[]>(`${environment.baseApiUrl}/api/BlogPosts`);
  }
  getBlogPostById(id:string) : Observable<BlogPost>
  {
    return this.http.get<BlogPost>(`${environment.baseApiUrl}/api/blogposts/${id}`);
  }
  getBlogPostByUrlHandle(urlHandle:string):Observable<BlogPost>
  {
    return this.http.get<BlogPost>(`${environment.baseApiUrl}/api/blogposts/${urlHandle}`);
  }
  createBlogPost(data:AddBlogPost):Observable<BlogPost>
  {
return this.http.post<BlogPost> (`${environment.baseApiUrl}/api/BlogPosts?addAuth=true`,data);
  }
  UpdateBlogPost(id:string,updatedBlogPost:UpdateBlogPost):Observable<BlogPost>
  {
return this.http.put<BlogPost>(`${environment.baseApiUrl}/api/blogPosts/${id}?addAuth=true`,updatedBlogPost);
  }
  deleteBlogPost(id:string) : Observable<BlogPost>
  {
    return this.http.delete<BlogPost>(`${environment.baseApiUrl}/api/blogPosts/${id}?addAuth=true`);
  }



}
