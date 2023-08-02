import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
id:string | null = null;
paramsSubscription?:Subscription;
editCategorySubscription?:Subscription;
category?: Category;
constructor(private route:ActivatedRoute,private categoryService : CategoryService,private router:Router) { }

  // without using subscription
  // ngOnInit() {

  //   this.route.paramMap.subscribe({
  //     next :(params)=>{
  //       this.id = params.get('id');
  //     }
  //   })
  // }

  ///with subscription
  ngOnInit() {

    this.paramsSubscription =  this.route.paramMap.subscribe({
      next :(params)=>{
        this.id = params.get('id');
        if(this.id)
        {
          // get the data from the API for this category ID
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next : (response)=>{
this.category = response;
            }
          })

        }
      }
    })
  }


  // without subscription
  ngOnDestroy():void{
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

  onFormSubmit():void
  {
    const updateCategoryRequest:UpdateCategoryRequest={
name:this.category?.name ?? '',
urlHandle : this.category?.urlHandle ?? ''


    };
    //pass this object to service
    if(this.id)
    {

     this.editCategorySubscription =  this.categoryService.updateCategory(this.id,updateCategoryRequest)
      .subscribe({
        next : (response)=>{
          this.router.navigateByUrl('/admin/categories');

        }
      });

    }

    console.log(this.category);

  }
  onDelete():void
  {
    if(this.id)
    {

      alert("Are you sure you want to delete the record ?");
      this.categoryService.deleteCategory(this.id)

      .subscribe({
        next : (response)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }


  }

}
