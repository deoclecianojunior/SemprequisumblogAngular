import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PnotifyService } from '../../services/pnotify.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Observable<Object>;
  public table = 'usuarios'

  constructor(private afs: AngularFirestore, private pnotify: PnotifyService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){  
    this.usuarios = this.afs.collection(this.table)
      .snapshotChanges().map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  remover(id){
    this.pnotify.pnotify.error({
      title: "Confirmação",
      text: "Deseja realmente remover esse registro?",
      hide: false,
      modules: {
        Confirm: {
          confirm: true,
          buttons: [
            {
              text: "Sim",
              textTrusted: false,
              addClass: "btn-danger",
              primary: true,
              promptTrigger: true,
              click: (notice, value) => {
                this.afs.collection(this.table).doc(id).delete();
                notice.close();
                notice.fire("pnotify.confirm", {notice, value});
              return false;
              }
            },
            {
              text: "Não",
              textTrusted: false,
              addClass: "btn-success",
              click: (notice) => {
                notice.close();
                notice.fire("pnotify.cancel", {notice});
              return false;
              }
            }
          ]
        },
        buttons: {
          closer: false,
          sticker: false
        },
        history: {
            history: false
        }
      }
    });
  }
}
