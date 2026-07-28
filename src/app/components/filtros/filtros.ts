import {
  Component,
  output,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

export interface FiltrosCatalogo {
  busca: string;
  genero: string;
  marca: string;

  precoMinimo: number;
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

  readonly filtrosAlterados =
    output<FiltrosCatalogo>();

  /* ========================================
     FILTROS
  ======================================== */

  readonly busca =
    signal('');

  readonly genero =
    signal('');

  readonly marca =
    signal('');

  readonly precoMinimo =
    signal(0);

  readonly precoMaximo =
    signal(2500);

  readonly destaque =
    signal('');

  /* ========================================
     MARCAS
  ======================================== */

  readonly marcas = [
    'Dior',
    'Chanel',
    'Carolina Herrera',
    'Yves Saint Laurent'
  ];

  /* ========================================
     ATUALIZAR PREÇO MÍNIMO
  ======================================== */

  atualizarPrecoMinimo(
    valor: string
  ): void {

    const numero =
      Number(valor);

    this.precoMinimo.set(
      Number.isFinite(numero)
        ? Math.max(0, numero)
        : 0
    );

    this.atualizarFiltros();
  }

  /* ========================================
     ATUALIZAR PREÇO MÁXIMO
  ======================================== */

  atualizarPrecoMaximo(
    valor: string
  ): void {

    const numero =
      Number(valor);

    this.precoMaximo.set(
      Number.isFinite(numero)
        ? Math.max(0, numero)
        : 2500
    );

    this.atualizarFiltros();
  }

  /* ========================================
     EMITIR FILTROS
  ======================================== */

  atualizarFiltros(): void {

    let minimo =
      this.precoMinimo();

    let maximo =
      this.precoMaximo();

    /*
      Evita faixa inválida.
      Exemplo:
      mínimo 2000
      máximo 500
    */

    if (minimo > maximo) {
      [minimo, maximo] =
        [maximo, minimo];
    }

    this.filtrosAlterados.emit({
      busca: this.busca(),
      genero: this.genero(),
      marca: this.marca(),

      precoMinimo: minimo,
      precoMaximo: maximo,

      destaque: this.destaque()
    });
  }

  /* ========================================
     LIMPAR
  ======================================== */

  limparFiltros(): void {

    this.busca.set('');

    this.genero.set('');

    this.marca.set('');

    this.precoMinimo.set(0);

    this.precoMaximo.set(2500);

    this.destaque.set('');

    this.atualizarFiltros();
  }
}