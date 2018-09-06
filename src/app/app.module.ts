import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SobreComponent } from './sobre/sobre.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { PostagensComponent } from './admin/postagens/postagens.component';
import { CadastrarPostagemComponent } from './admin/postagens/cadastrar-postagem/cadastrar-postagem.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { CadastrarUsuariosComponent } from './admin/usuarios/cadastrar-usuarios/cadastrar-usuarios.component';
import { AuthService } from './services/auth.service';
import { GuardGuard } from './services/guard.guard';
import { PnotifyService } from './services/pnotify.service';

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    PostagensComponent,
    CadastrarPostagemComponent,
    NavbarComponent,
    PostComponent,
    UsuariosComponent,
    CadastrarUsuariosComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, GuardGuard, PnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
