import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Carrinho } from './components/carrinho/carrinho';
import { DetalhesProduto } from './components/detalhes-produto/detalhes-produto';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Carrinho,
    DetalhesProduto
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}