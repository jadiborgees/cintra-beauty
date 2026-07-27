import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FiltrosCatalogo {
  busca: string;
  genero: string;
  marca: string;
  precoMaximo: number;
  destaque: string;
}

@Component({
  selector: 'app-filtros',
  imports: [FormsModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css'
})
export class Filtros {
  filtrosAlterados = output<FiltrosCatalogo>();

  busca = signal('');
  genero = signal('');
  marca = signal('');
  precoMaximo = signal(2500);

  destaque = signal('');

  readonly marcas = [
    'Dior',
    'Chanel',
    'Carolina Herrera',
    'Yves Saint Laurent'
  ];

  atualizarFiltros(): void {
    this.filtrosAlterados.emit({
      busca: this.busca(),
      genero: this.genero(),
      marca: this.marca(),
      precoMaximo: this.precoMaximo(),
      destaque: this.destaque()
    });
  }

  limparFiltros(): void {
    this.busca.set('');
    this.genero.set('');
    this.marca.set('');
    this.precoMaximo.set(2500);
    this.destaque.set('');

    this.atualizarFiltros();
  }
}