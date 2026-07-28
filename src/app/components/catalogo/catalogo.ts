import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

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

  private readonly produtoService =
    inject(ProdutoService);

  /* ========================================
     FILTROS
  ======================================== */

  readonly filtros =
    signal<FiltrosCatalogo>({
      busca: '',
      genero: '',
      marca: '',

      precoMinimo: 0,
      precoMaximo: 2500,

      destaque: ''
    });

  /* ========================================
     ORDENAÇÃO
  ======================================== */

  readonly ordenacao =
    signal('relevancia');

  /* ========================================
     FILTRO MOBILE
  ======================================== */

  readonly filtrosMobileAberto =
    signal(false);

  /* ========================================
     PRODUTOS FILTRADOS
  ======================================== */

  readonly produtosFiltrados =
    computed(() => {

      const filtros =
        this.filtros();

      const ordenacao =
        this.ordenacao();

      const produtos =
        this.produtoService
          .produtos()
          .filter(produto => {

            /* BUSCA */

            const busca =
              filtros.busca
                .trim()
                .toLowerCase();

            const correspondeBusca =
              !busca ||
              produto.nome
                .toLowerCase()
                .includes(busca) ||
              produto.marca
                .toLowerCase()
                .includes(busca);

            /* GÊNERO */

            const correspondeGenero =
              !filtros.genero ||
              produto.genero ===
                filtros.genero;

            /* MARCA */

            const correspondeMarca =
              !filtros.marca ||
              produto.marca ===
                filtros.marca;

            /* PREÇO */

            const correspondePreco =
              produto.preco >=
                filtros.precoMinimo &&
              produto.preco <=
                filtros.precoMaximo;

            /* DESTAQUES */

            const correspondeDestaque =
              !filtros.destaque ||
              (
                filtros.destaque ===
                  'mais-vendidos' &&
                produto.maisVendido === true
              ) ||
              (
                filtros.destaque ===
                  'novidades' &&
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

      /* ====================================
         ORDENAÇÃO
      ==================================== */

      switch (ordenacao) {

        case 'menor-preco':

          return [...produtos]
            .sort(
              (a, b) =>
                a.preco - b.preco
            );

        case 'maior-preco':

          return [...produtos]
            .sort(
              (a, b) =>
                b.preco - a.preco
            );

        case 'mais-vendidos':

          return [...produtos]
            .sort(
              (a, b) =>
                Number(
                  Boolean(b.maisVendido)
                ) -
                Number(
                  Boolean(a.maisVendido)
                )
            );

        case 'novidades':

          return [...produtos]
            .sort(
              (a, b) =>
                Number(
                  Boolean(b.novidade)
                ) -
                Number(
                  Boolean(a.novidade)
                )
            );

        default:
          return produtos;
      }
    });

  /* ========================================
     ATUALIZAR FILTROS
  ======================================== */

  atualizarFiltros(
    filtros: FiltrosCatalogo
  ): void {

    this.filtros.set(
      filtros
    );
  }

  /* ========================================
     ATUALIZAR ORDENAÇÃO
  ======================================== */

  atualizarOrdenacao(
    valor: string
  ): void {

    this.ordenacao.set(
      valor
    );
  }

  /* ========================================
     FILTROS MOBILE
  ======================================== */

  alternarFiltrosMobile(): void {

    this.filtrosMobileAberto.update(
      aberto => !aberto
    );
  }
}