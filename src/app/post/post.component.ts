import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  public postagem;
  private table = 'posts'

  constructor(private afs: AngularFirestore, private routerActive: ActivatedRoute, public sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.routerActive.params.subscribe(
      params => {
         let item = this.afs.collection(this.table).doc(params.id);
          item.valueChanges().subscribe(post =>{
           if(post){
            this.postagem = post
            console.log(this.postagem)
           }
         })
      }
   );
  }

  sanitizerUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
