import { Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class DetalhesProdutoService {
  private readonly produtoSignal =
    signal<Produto | null>(null);

  readonly produto =
    this.produtoSignal.asReadonly();

  abrir(produto: Produto): void {
    this.produtoSignal.set(produto);
  }

  fechar(): void {
    this.produtoSignal.set(null);
  }
}