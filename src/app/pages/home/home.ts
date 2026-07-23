import { Component } from '@angular/core';

import { Hero } from '../../components/hero/hero';
import { MaisVendidos } from '../../components/mais-vendidos/mais-vendidos';
import { Catalogo } from '../../components/catalogo/catalogo';
import { Marcas } from '../../components/marcas/marcas';
import { Novidades } from '../../components/novidades/novidades';
import { Consultora } from '../../components/consultora/consultora';
import { ComoComprar } from '../../components/como-comprar/como-comprar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Marcas,
    MaisVendidos,
    Novidades,
    Catalogo,
    Consultora,
    ComoComprar,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}