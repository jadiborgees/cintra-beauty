import {
  Component,
  inject,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { CarrinhoService } from '../../services/carrinho';
import { FavoritosService } from '../../services/favoritos';

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

  readonly quantidadeCarrinho =
    this.carrinhoService.quantidadeTotal;

  readonly quantidadeFavoritos =
    this.favoritosService.quantidade;

  readonly menuAberto =
    signal(false);

  abrirCarrinho(): void {
    this.carrinhoService.abrir();
  }

  alternarMenu(): void {
    this.menuAberto.update(
      aberto => !aberto
    );
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }
}