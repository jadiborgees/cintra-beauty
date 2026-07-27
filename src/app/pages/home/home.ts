import { Component } from '@angular/core';

import { Hero } from '../../components/hero/hero';
import { Marcas } from '../../components/marcas/marcas';
import { Catalogo } from '../../components/catalogo/catalogo';
import { ComoComprar } from '../../components/como-comprar/como-comprar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Marcas,
    Catalogo,
    ComoComprar,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}