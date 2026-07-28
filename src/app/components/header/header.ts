import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { CarrinhoService } from '../../services/carrinho';
import { FavoritosService } from '../../services/favoritos';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private readonly carrinhoService =
    inject(CarrinhoService);

  private readonly favoritosService =
    inject(FavoritosService);

  private readonly produtoService =
    inject(ProdutoService);

  /* ========================================
     CONTADORES
  ======================================== */

  readonly quantidadeCarrinho =
    this.carrinhoService.quantidadeTotal;

  readonly quantidadeFavoritos =
    this.favoritosService.quantidade;

  /* ========================================
     MENU MOBILE
  ======================================== */

  readonly menuAberto =
    signal(false);

  /* ========================================
     PESQUISA MOBILE
  ======================================== */

  readonly buscaMobileAberta =
    signal(false);

  /* ========================================
     PESQUISA
  ======================================== */

  readonly termoBusca =
    signal('');

  readonly buscaFocada =
    signal(false);

  /* ========================================
     SUGESTÕES
  ======================================== */

  readonly sugestoes = computed(() => {

    const termo =
      this.termoBusca()
        .trim()
        .toLowerCase();

    if (termo.length < 2) {
      return [];
    }

    return this.produtoService
      .produtos()
      .filter(produto => {

        const nome =
          produto.nome.toLowerCase();

        const marca =
          produto.marca.toLowerCase();

        return (
          nome.includes(termo) ||
          marca.includes(termo)
        );
      })
      .slice(0, 5);
  });

  readonly mostrarSugestoes = computed(() => {
    return (
      this.buscaFocada() &&
      this.sugestoes().length > 0
    );
  });

  /* ========================================
     CARRINHO
  ======================================== */

  abrirCarrinho(): void {
    this.buscaMobileAberta.set(false);
    this.buscaFocada.set(false);

    this.carrinhoService.abrir();
  }

  /* ========================================
     MENU
  ======================================== */

  alternarMenu(): void {

    const abrir =
      !this.menuAberto();

    this.menuAberto.set(abrir);

    if (abrir) {
      this.buscaMobileAberta.set(false);
      this.buscaFocada.set(false);
    }
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }

  /* ========================================
     BUSCA MOBILE
  ======================================== */

  alternarBuscaMobile(): void {

    const abrir =
      !this.buscaMobileAberta();

    this.buscaMobileAberta.set(abrir);

    this.menuAberto.set(false);

    if (!abrir) {
      this.buscaFocada.set(false);
    }
  }

  fecharBuscaMobile(): void {
    this.buscaMobileAberta.set(false);
    this.buscaFocada.set(false);
  }

  /* ========================================
     DIGITAÇÃO
  ======================================== */

  atualizarBusca(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    this.termoBusca.set(
      input.value
    );

    this.buscaFocada.set(true);
  }

  /* ========================================
     FOCO
  ======================================== */

  abrirSugestoes(): void {
    this.buscaFocada.set(true);
  }

  fecharSugestoes(): void {

    setTimeout(() => {
      this.buscaFocada.set(false);
    }, 250);
  }

  /* ========================================
     ESCOLHER SUGESTÃO
  ======================================== */

  selecionarSugestao(
    nomeProduto: string
  ): void {

    this.termoBusca.set(
      nomeProduto
    );

    this.buscaFocada.set(false);

    this.buscaMobileAberta.set(false);

    this.aplicarBuscaNoCatalogo(
      nomeProduto
    );
  }

  /* ========================================
     BUSCAR
  ======================================== */

  buscarNoCatalogo(
    event: Event
  ): void {

    event.preventDefault();

    const termo =
      this.termoBusca().trim();

    this.buscaFocada.set(false);

    this.buscaMobileAberta.set(false);

    this.aplicarBuscaNoCatalogo(
      termo
    );
  }

  /* ========================================
     APLICAR NO CATÁLOGO
  ======================================== */

  private aplicarBuscaNoCatalogo(
    termo: string
  ): void {

    const campoBuscaCatalogo =
      document.querySelector<HTMLInputElement>(
        '#busca'
      );

    const catalogo =
      document.querySelector<HTMLElement>(
        '#catalogo'
      );

    if (campoBuscaCatalogo) {

      campoBuscaCatalogo.value =
        termo;

      campoBuscaCatalogo.dispatchEvent(
        new Event(
          'input',
          {
            bubbles: true
          }
        )
      );
    }

    this.fecharMenu();

    setTimeout(() => {

      catalogo?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }, 50);
  }
}