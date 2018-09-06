import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { HomeComponent } from './home/home.component';
import { PostagensComponent } from './admin/postagens/postagens.component';
import { CadastrarPostagemComponent } from './admin/postagens/cadastrar-postagem/cadastrar-postagem.component';
import { PostComponent } from './post/post.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { CadastrarUsuariosComponent } from './admin/usuarios/cadastrar-usuarios/cadastrar-usuarios.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  
  { path: 'postagens', component: PostagensComponent, canActivate: [GuardGuard] },
  { path: 'postagens/cadastrar', component: CadastrarPostagemComponent, canActivate: [GuardGuard]},
  { path: 'postagens/cadastrar/:id', component: CadastrarPostagemComponent, canActivate: [GuardGuard]},

  { path: 'usuarios', component: UsuariosComponent , canActivate: [GuardGuard]},
  { path: 'usuarios/cadastrar', component: CadastrarUsuariosComponent, canActivate: [GuardGuard]},
  { path: 'usuarios/cadastrar/:id', component: CadastrarUsuariosComponent, canActivate: [GuardGuard]},

  { path: 'post/:id', component: PostComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [ 
    RouterModule 
  ],
  declarations: []
})
export class AppRoutingModule { }
