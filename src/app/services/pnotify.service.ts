import { Injectable } from '@angular/core';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import { PNotifyConfirm } from "pnotify/dist/es/PNotifyConfirm";

@Injectable()
export class PnotifyService {

  public pnotify = PNotify;

  constructor() {
    this.initPnotify()
  }

  initPnotify(){
    PNotifyButtons; // Initiate the module. Important!
    PNotifyConfirm;
    PNotify.defaults.styling = "bootstrap4";
    PNotify.defaults.icons = "fontawesome4"; // Font Awesome 4
    this.pnotify = PNotify;
  }

  setNotification(titulo: String, texto: String, tipo: String){
    this.pnotify.alert({title: titulo, text: texto, type: tipo});
  }

  confirmacao(titulo: String, texto: String, tipo: String){
    PNotifyButtons; // Initiate the module. Important!
    this.pnotify.alert({
      title: titulo,
      text: texto,
      hide: false,
      type: tipo,
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
