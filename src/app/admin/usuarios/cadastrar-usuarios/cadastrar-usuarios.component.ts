import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../services/auth.service'
import { PnotifyService } from '../../../services/pnotify.service';

@Component({
  selector: 'app-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.css']
})
export class CadastrarUsuariosComponent implements OnInit {

  public usuario: Object;
  private table = 'usuarios'
  private fotoUpdate;
  uploadArquivo = false;
  uploadPercent;
  heroForm;
  valid = true;
  downloadURL: Observable<string>;

  constructor(private auth: AuthService, private afs: AngularFirestore, private router: Router, private routerActive: ActivatedRoute, private storage: AngularFireStorage, private spinnerService: Ng4LoadingSpinnerService, private pnotify: PnotifyService) { 
    this.usuario = {nome: '', email: '', senha: ''}
  }

  ngOnInit() {
    
    this.routerActive.params.subscribe(
      params => {
         this.fotoUpdate = this.afs.collection(this.table).doc(params.id);
          this.fotoUpdate.valueChanges().subscribe(users =>{
           if(users){
            this.usuario = users
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
    // observe percentage changes
    task.percentageChanges().subscribe(p => {
      this.uploadPercent = p
    });
    // get notified when the download URL is available
    // console.log(task.downloadURL())
    this.downloadURL = task.downloadURL();
    this.downloadURL.subscribe( u => {
      this.spinnerService.hide();
      this.uploadArquivo = false;
      console.log(u)
      this.usuario['foto'] = u
    })
  }

  cadastrar(){
    if(this.uploadArquivo === true){
      this.pnotify.setNotification("Ops", 'Aguarde o upload do arquivo', 'info' );
      return false;
    }
    this.auth.signup(this.usuario['email'], this.usuario['senha']).then( user => {
      if(user != null){
        this.afs.collection(this.table).doc(user.uid).set(this.usuario).then( u => {
          console.log(u)
          this.auth.setName(this.usuario['nome'], this.usuario['foto']);
          this.router.navigate(['/usuarios'])
        }).catch(c => {
          // console.log("salvar usuario")
        })
      }
    }).catch(cuser => {
      this.pnotify.setNotification("Ops, algo deu errado", cuser, 'error' );
      console.log(cuser)
    })
  }
}
