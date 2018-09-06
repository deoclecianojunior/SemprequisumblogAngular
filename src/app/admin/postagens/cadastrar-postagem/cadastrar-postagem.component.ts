import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.css']
})

export class CadastrarPostagemComponent implements OnInit {

  postagem: Object;
  private table = 'posts'
  private itemUpdate;
  uploadArquivo = false;
  uploadPercent;
  downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private router: Router, private routerActive: ActivatedRoute, private storage: AngularFireStorage, private spinnerService: Ng4LoadingSpinnerService) { 
  }
  
  ngOnInit() {
    this.routerActive.params.subscribe(
      params => {
         this.itemUpdate = this.afs.collection(this.table).doc(params.id);
          this.itemUpdate.valueChanges().subscribe(post =>{
           if(post){
            this.postagem = post
           }
         })
      }
   );
  }

  uploadFile(event) {
    this.spinnerService.show();
    let nome_arquivo = '_' + Math.random().toString(36).substr(2, 20);
    const task = this.storage.upload(nome_arquivo, event.target.files[0]);
    this.uploadArquivo = true
    task.percentageChanges().subscribe(p => {
      this.uploadPercent = p
    });
    this.downloadURL = task.downloadURL();
    this.downloadURL.subscribe( u => {
      this.spinnerService.hide();
      this.uploadArquivo = false;
      this.postagem['midia'] = u
    })
  }

  cadastrar(){
    if(this.uploadArquivo === true){
      return false;
    }
    if(this.itemUpdate){
      this.itemUpdate.update(this.postagem)
      this.postagem['updated'] = new Date();
    }else{
      this.postagem['data'] = new Date();
      this.postagem['autor'] = "Deocleciano Júnior";
      console.log(this.postagem);
      this.afs.collection(this.table).add(this.postagem)
    }
    this.router.navigate(['/postagens'])
  }
}
