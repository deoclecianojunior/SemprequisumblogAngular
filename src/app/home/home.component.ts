import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PnotifyService } from '../services/pnotify.service';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  postagens: Observable<Object>;
  private table = 'posts'
  constructor(private afs: AngularFirestore, private pnf: PnotifyService, public sanitizer:DomSanitizer) { 
  }

  ngOnInit() {
    this.getPosts();    
  }

  getPosts(){
    this.postagens = this.afs.collection(this.table, ref => ref.orderBy('data','desc'))
      .snapshotChanges().map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  sanitizerUrl(url){
    let urlRetorno =  this.sanitizer.bypassSecurityTrustUrl(url);
    console.log(urlRetorno)
    return urlRetorno;
  }

  truncate(texto){
    var trunc = 400;
    var text
    while(texto[trunc] != ' '){
      trunc++;
      break;
    }
    return texto.substring(0,trunc);
  }
}
