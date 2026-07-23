import { Injectable } from '@angular/core';

import { ItemCarrinho } from '../models/item-carrinho';
import { OpcaoFrete } from './frete';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private readonly numeroLoja = '5515988239922';

  abrirPedido(
    itens: ItemCarrinho[],
    nomeCliente: string,
    cep: string,
    frete: OpcaoFrete,
    total: number
  ): void {

    const produtosTexto = itens
      .map(item => {
        const valorProduto =
          item.produto.preco * item.quantidade;

        return [
          `*${item.produto.nome}*`,
          `${item.produto.marca} - ${item.produto.volume}`,
          `Qtd: ${item.quantidade}`,
          `Valor: ${this.formatarMoeda(valorProduto)}`
        ].join('\n');
      })
      .join('\n\n');

    const mensagem = [
      `Olá, meu nome é ${nomeCliente}!`,
      '',
      'Gostaria de fazer este pedido:',
      '',
      produtosTexto,
      '',
      '*Frete:*',
      frete.nome,
      this.formatarMoeda(frete.valor),
      '',
      '*CEP:*',
      cep,
      '',
      '*Total:*',
      this.formatarMoeda(total)
    ].join('\n');

    const url =
      `https://wa.me/${this.numeroLoja}` +
      `?text=${encodeURIComponent(mensagem)}`;

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }

  private formatarMoeda(
    valor: number
  ): string {
    return new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    ).format(valor);
  }
}