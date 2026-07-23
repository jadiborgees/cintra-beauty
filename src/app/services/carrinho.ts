import {
  computed,
  effect,
  Injectable,
  signal
} from '@angular/core';

import { Produto } from '../models/produto';
import { ItemCarrinho } from '../models/item-carrinho';
import { OpcaoFrete } from './frete';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly chaveStorage =
    'cintra-beauty-carrinho';

  private readonly abertoSignal =
    signal(false);

  private readonly itensSignal =
    signal<ItemCarrinho[]>(
      this.carregarCarrinho()
    );

  private readonly freteSignal =
    signal<OpcaoFrete | null>(null);

  readonly aberto =
    this.abertoSignal.asReadonly();

  readonly itens =
    this.itensSignal.asReadonly();

  readonly frete =
    this.freteSignal.asReadonly();

  readonly quantidadeTotal = computed(() => {
    return this.itensSignal().reduce(
      (total, item) =>
        total + item.quantidade,
      0
    );
  });

  readonly subtotal = computed(() => {
    return this.itensSignal().reduce(
      (total, item) =>
        total +
        item.produto.preco *
        item.quantidade,
      0
    );
  });

  readonly total = computed(() => {
    const valorFrete =
      this.freteSignal()?.valor ?? 0;

    return this.subtotal() + valorFrete;
  });

  constructor() {
    effect(() => {
      const itens =
        this.itensSignal();

      localStorage.setItem(
        this.chaveStorage,
        JSON.stringify(itens)
      );
    });
  }

  abrir(): void {
    this.abertoSignal.set(true);
  }

  fechar(): void {
    this.abertoSignal.set(false);
  }

  alternar(): void {
    this.abertoSignal.update(
      aberto => !aberto
    );
  }

adicionar(
  produto: Produto,
  quantidade: number = 1
): void {
  if (quantidade < 1) {
    return;
  }

  const itemExistente =
    this.itensSignal().find(
      item =>
        item.produto.id === produto.id
    );

  if (itemExistente) {
    const novaQuantidade =
      Math.min(
        itemExistente.quantidade + quantidade,
        produto.estoque
      );

    this.itensSignal.update(
      itens =>
        itens.map(item =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: novaQuantidade
              }
            : item
        )
    );

    this.abrir();

    return;
  }

  const quantidadePermitida =
    Math.min(
      quantidade,
      produto.estoque
    );

  if (quantidadePermitida < 1) {
    return;
  }

  this.itensSignal.update(
    itens => [
      ...itens,
      {
        produto,
        quantidade: quantidadePermitida
      }
    ]
  );

  this.abrir();
}
  aumentarQuantidade(
    produtoId: number
  ): void {
    this.itensSignal.update(
      itens =>
        itens.map(item => {
          if (
            item.produto.id !== produtoId
          ) {
            return item;
          }

          if (
            item.quantidade >=
            item.produto.estoque
          ) {
            return item;
          }

          return {
            ...item,
            quantidade:
              item.quantidade + 1
          };
        })
    );
  }

  diminuirQuantidade(
    produtoId: number
  ): void {
    this.itensSignal.update(
      itens =>
        itens
          .map(item =>
            item.produto.id === produtoId
              ? {
                ...item,
                quantidade:
                  item.quantidade - 1
              }
              : item
          )
          .filter(
            item =>
              item.quantidade > 0
          )
    );
  }

  remover(
    produtoId: number
  ): void {
    this.itensSignal.update(
      itens =>
        itens.filter(
          item =>
            item.produto.id !== produtoId
        )
    );

    if (
      this.itensSignal().length === 0
    ) {
      this.limparFrete();
    }
  }

  limpar(): void {
    this.itensSignal.set([]);

    this.limparFrete();
  }

  selecionarFrete(
    frete: OpcaoFrete
  ): void {
    this.freteSignal.set(frete);
  }

  limparFrete(): void {
    this.freteSignal.set(null);
  }

  private carregarCarrinho():
    ItemCarrinho[] {
    try {
      const carrinhoSalvo =
        localStorage.getItem(
          this.chaveStorage
        );

      if (!carrinhoSalvo) {
        return [];
      }

      const itens =
        JSON.parse(carrinhoSalvo);

      return Array.isArray(itens)
        ? itens
        : [];
    } catch {
      return [];
    }
  }
}