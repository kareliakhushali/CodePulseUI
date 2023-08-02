import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../../category/services/blogpost.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy {
  // for storing the id
id:string | null = null;
model?:BlogPost;
routeSubscription?: Subscription;
updateBlogPostSubscription?:Subscription;
getBlogPostSubscription?:Subscription;
deleteBlogPostSubscription?:Subscription;
imageSelectSubscription?:Subscription;
isImageSelectorVisible:boolean = false;
categories$?:Observable<Category[]>;
selectedCategories?:string[]
  constructor(private route : ActivatedRoute,private blogPostService: BlogpostService,private categoryService:CategoryService,private router:Router,private imageService:ImageService) { }

  ngOnInit() : void{
   this.categories$ =  this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next :(params) =>
      {
this.id = params.get('id');
// get blogpost from API
if(this.id)
{
 this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
next :(response)=>{
this.model = response;
// for getting the selected category
this.selectedCategories = response.categories.map(x=>x.id);
}
  });
}
// for selecting the image
this.imageSelectSubscription = this.imageService.onSelectImage()
.subscribe({
  next :(response) =>{
    if(this.model)
    {
      this.model.featuredImageUrl = response.url;
      // closing the model after selecting the image
      this.isImageSelectorVisible = false;
    }
  }
})
      }
    });
  }

  onFormSubmit():void{
    // convert this model to request object
    if(this.model && this.id)
    {
      var updateBlogPost:UpdateBlogPost = {
author : this.model.author,
content : this.model.content,
shortDescription : this.model.shortDescription,
featuredImageUrl : this.model.featuredImageUrl,
isVisible : this.model.isVisible,
publishedDate : this.model.publishedDate,
title :this.model.title,
urlHandle : this.model.urlHandle,
categories : this.selectedCategories ?? []
      };
 this.updateBlogPostSubscription = this.blogPostService.UpdateBlogPost(this.id,updateBlogPost)
      .subscribe({
        next : (response)=>{
this.router.navigateByUrl('/admin/blogposts');

        }
      });
    }

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
  onDelete():void{
if(this.id)
{
  alert("Are you sure you want to delete the blogpost?");
  // call service and delete blog post
 this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
  .subscribe({
    next :(response)=>{
      this.router.navigateByUrl('/admin/blogposts')
    }
  })

}
  }
  openImageSelector() :void
  {
this.isImageSelectorVisible = true;
  }
  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

}
