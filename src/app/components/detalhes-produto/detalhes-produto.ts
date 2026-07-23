import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CarrinhoService } from '../../services/carrinho';
import { DetalhesProdutoService } from '../../services/detalhes-produto';
import { FavoritosService } from '../../services/favoritos';

@Component({
  selector: 'app-detalhes-produto',
  imports: [CurrencyPipe],
  templateUrl: './detalhes-produto.html',
  styleUrl: './detalhes-produto.css'
})
export class DetalhesProduto {
  private readonly detalhesService =
    inject(DetalhesProdutoService);

  private readonly carrinhoService =
    inject(CarrinhoService);

  private readonly favoritosService =
    inject(FavoritosService);

  readonly produto =
    this.detalhesService.produto;

  readonly quantidade =
    signal(1);

  fechar(): void {
    this.quantidade.set(1);

    this.detalhesService.fechar();
  }

  aumentarQuantidade(): void {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    if (this.quantidade() >= produto.estoque) {
      return;
    }

    this.quantidade.update(
      quantidade => quantidade + 1
    );
  }

  diminuirQuantidade(): void {
    if (this.quantidade() <= 1) {
      return;
    }

    this.quantidade.update(
      quantidade => quantidade - 1
    );
  }

  adicionarAoCarrinho(): void {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    this.carrinhoService.adicionar(
      produto,
      this.quantidade()
    );

    this.quantidade.set(1);

    this.fechar();
  }

  alternarFavorito(): void {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    this.favoritosService.alternar(
      produto
    );
  }

  estaFavoritado(): boolean {
    const produto = this.produto();

    if (!produto) {
      return false;
    }

    return this.favoritosService.estaFavoritado(
      produto.id
    );
  }
}