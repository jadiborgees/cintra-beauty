import { Component, computed, inject, signal } from '@angular/core';

import { ProdutoService } from '../../services/produto';

import { CardProduto } from '../card-produto/card-produto';
import {
  Filtros,
  FiltrosCatalogo
} from '../filtros/filtros';

@Component({
  selector: 'app-catalogo',
  imports: [
    CardProduto,
    Filtros
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  private readonly produtoService = inject(ProdutoService);

  readonly filtros = signal<FiltrosCatalogo>({
    busca: '',
    genero: '',
    marca: '',
    precoMaximo: 2500,
    destaque: ''
  });

  readonly produtosFiltrados = computed(() => {
    const filtros = this.filtros();

    return this.produtoService.produtos().filter(produto => {
      const busca = filtros.busca
        .trim()
        .toLowerCase();

      const correspondeBusca =
        !busca ||
        produto.nome.toLowerCase().includes(busca) ||
        produto.marca.toLowerCase().includes(busca);

      const correspondeGenero =
        !filtros.genero ||
        produto.genero === filtros.genero;

      const correspondeMarca =
        !filtros.marca ||
        produto.marca === filtros.marca;

      const correspondePreco =
        produto.preco <= filtros.precoMaximo;

      const correspondeDestaque =
        !filtros.destaque ||
        (
          filtros.destaque === 'mais-vendidos' &&
          produto.maisVendido === true
        ) ||
        (
          filtros.destaque === 'novidades' &&
          produto.novidade === true
        );

      return (
        correspondeBusca &&
        correspondeGenero &&
        correspondeMarca &&
        correspondePreco &&
        correspondeDestaque
      );
    });
  });

  atualizarFiltros(filtros: FiltrosCatalogo): void {
    this.filtros.set(filtros);
  }
}