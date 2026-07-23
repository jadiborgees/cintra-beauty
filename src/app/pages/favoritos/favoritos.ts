import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardProduto } from '../../components/card-produto/card-produto';
import { FavoritosService } from '../../services/favoritos';

@Component({
  selector: 'app-favoritos',
  imports: [
    CardProduto,
    RouterLink
  ],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {
  private readonly favoritosService =
    inject(FavoritosService);

  readonly favoritos =
    this.favoritosService.favoritos;
}