import { computed, effect, Injectable, signal } from '@angular/core';

import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private readonly chaveStorage = 'cintra-beauty-favoritos';

  private readonly favoritosSignal = signal<Produto[]>(
    this.carregarFavoritos()
  );

  readonly favoritos = this.favoritosSignal.asReadonly();

  readonly quantidade = computed(() => {
    return this.favoritosSignal().length;
  });

  constructor() {
    effect(() => {
      localStorage.setItem(
        this.chaveStorage,
        JSON.stringify(this.favoritosSignal())
      );
    });
  }

  alternar(produto: Produto): void {
    const jaFavoritado = this.estaFavoritado(produto.id);

    if (jaFavoritado) {
      this.remover(produto.id);
      return;
    }

    this.favoritosSignal.update(favoritos => [
      ...favoritos,
      produto
    ]);
  }

  remover(produtoId: number): void {
    this.favoritosSignal.update(favoritos =>
      favoritos.filter(
        produto => produto.id !== produtoId
      )
    );
  }

  estaFavoritado(produtoId: number): boolean {
    return this.favoritosSignal().some(
      produto => produto.id === produtoId
    );
  }

  private carregarFavoritos(): Produto[] {
    try {
      const favoritosSalvos =
        localStorage.getItem(this.chaveStorage);

      if (!favoritosSalvos) {
        return [];
      }

      return JSON.parse(favoritosSalvos);
    } catch {
      return [];
    }
  }
}