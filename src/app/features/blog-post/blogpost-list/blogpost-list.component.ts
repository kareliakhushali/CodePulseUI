import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../category/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

 // using observable
 // blogPosts ?: BlogPost[];

// using async pipe
blogPosts$?:Observable<BlogPost[]>;
  constructor(private blogPostService: BlogpostService) { }

  ngOnInit() : void {
    //get all blog posts from APi
  this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }

}
