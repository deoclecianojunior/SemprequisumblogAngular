import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  show: boolean;
}

export const ROUTES: RouteInfo[] = [
  { path: 'postagens', title: 'Postagens',  icon:'unarchive', class: 'nav-item', show: this.logado},
  { path: 'usuarios', title: 'Usuarios',  icon:'unarchive', class: 'nav-item', show: this.logado}
];


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuItems: any[];
  public logado: boolean;
  constructor(private Auth: AuthService) { 
    this.Auth.user.subscribe(user =>{
      if(user == null){
        this.logado = false
      }else{
        this.logado = true;
      }
    })
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  sair(){
    this.Auth.logout();
  }

}
