import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
// using observable
 // categories ?: Category[];

// using async pipe
categories$?:Observable<Category[]>;

  constructor(private categoryService:CategoryService) { }
  // using observble and subscribe
//   ngOnInit() : void{
//     this.categoryService.getAllCategories()
//     .subscribe({
//       next : (response)=>{
// this.categories = response;
//       }
//     })

//   }
ngOnInit() : void{
  this.categories$ =  this.categoryService.getAllCategories();

}

}
