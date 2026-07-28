import { Component } from '@angular/core';

interface Marca {
  nome: string;
  logo: string;
}

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.html',
  styleUrl: './marcas.css'
})
export class Marcas {

  readonly marcas: Marca[] = [
    {
      nome: 'Dior',
      logo: '/dior.png'
    },
    {
      nome: 'Chanel',
      logo: '/chanel.png'
    },
    {
      nome: 'Carolina Herrera',
      logo: '/carolina-herrera.png'
    },
    {
      nome: 'Yves Saint Laurent',
      logo: '/yves-saint-laurent.png'
    },
    {
      nome: 'Paco Rabanne',
      logo: '/paco-rabanne.png'
    },
    {
      nome: 'Versace',
      logo: '/versace.png'
    },
    {
      nome: 'Jean Paul Gaultier',
      logo: '/jean-paul-gaultier.png'
    },
    {
      nome: 'Giorgio Armani',
      logo: '/giorgio-armani.png'
    }
  ];

}