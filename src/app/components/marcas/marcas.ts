import { Component } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.html',
  styleUrl: './marcas.css'
})
export class Marcas {
  readonly marcas = [
    'Dior',
    'Chanel',
    'Carolina Herrera',
    'Yves Saint Laurent',
    'Paco Rabanne',
    'Versace',
    'Jean Paul Gaultier',
    'Giorgio Armani'
  ];
}