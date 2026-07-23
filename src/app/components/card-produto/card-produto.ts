import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import { Produto } from '../../models/produto';
import { CarrinhoService } from '../../services/carrinho';
import { FavoritosService } from '../../services/favoritos';
import { DetalhesProdutoService } from '../../services/detalhes-produto';

@Component({
  selector: 'app-card-produto',
  imports: [CurrencyPipe],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css'
})
export class CardProduto {
  produto = input.required<Produto>();

  private readonly carrinhoService =
    inject(CarrinhoService);

  private readonly favoritosService =
    inject(FavoritosService);

  private readonly detalhesProdutoService =
    inject(DetalhesProdutoService);

  readonly favoritado = computed(() =>
    this.favoritosService.estaFavoritado(
      this.produto().id
    )
  );

  adicionarAoCarrinho(): void {
    this.carrinhoService.adicionar(
      this.produto()
    );
  }

  alternarFavorito(): void {
    this.favoritosService.alternar(
      this.produto()
    );
  }

  abrirDetalhes(): void {
    this.detalhesProdutoService.abrir(
      this.produto()
    );
  }
}