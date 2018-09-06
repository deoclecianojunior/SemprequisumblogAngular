import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PnotifyService } from '../../services/pnotify.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuario: Object = {};
  public email_assine : string = null;
  public logado = false;
  constructor(private afs: AngularFirestore, private auth: AuthService, private spinnerService: Ng4LoadingSpinnerService, private pnotify: PnotifyService) {
    
    this.auth.user.subscribe(user => {
      if(user == null){
        this.logado = false;
      }else{
        this.logado = true;
        this.usuario = {nome: user.displayName, email: user.email, foto: user.photoURL}
        console.log(user.displayName, user.email, user.photoURL);
      }
    })
  }

  ngOnInit() {
  }

  login(){
    this.spinnerService.show();
    this.auth.login(this.usuario['email'], this.usuario['senha']).then(user => {
      this.spinnerService.hide();
      this.usuario = {}
    })
  }

  assinar(){
    this.spinnerService.show()
    this.afs.collection("newsletter").add({email : this.email_assine}).then( u => {
      this.spinnerService.hide();
      this.email_assine = null;
      this.pnotify.setNotification("Sucesso", "Yeah, salvamos seu e-mail, mandaremos uma mensagem para você sempre que houverem novidades por aqui :D", "success")
    }).catch( c => {
      this.spinnerService.hide();
    })
  }

  sair(){
    this.auth.logout();
  }
}
