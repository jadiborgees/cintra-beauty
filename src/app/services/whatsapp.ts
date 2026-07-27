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
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
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
          `Quantidade: ${item.quantidade}`,
          `Valor: ${this.formatarMoeda(valorProduto)}`
        ].join('\n');
      })
      .join('\n\n');

    const enderecoTexto = [
      `CEP: ${cep}`,
      `Endereço: ${logradouro}, ${numero}`,
      complemento
        ? `Complemento: ${complemento}`
        : null,
      `Bairro: ${bairro}`,
      `Cidade: ${cidade} - ${uf}`
    ]
      .filter(Boolean)
      .join('\n');

    const mensagem = [
      `Olá, meu nome é ${nomeCliente}!`,
      '',
      'Gostaria de fazer este pedido:',
      '',
      '*PEDIDO*',
      '',
      produtosTexto,
      '',
      '*DADOS PARA ENTREGA*',
      '',
      enderecoTexto,
      '',
      '*FRETE*',
      `${frete.nome}`,
      `Valor: ${this.formatarMoeda(frete.valor)}`,
      '',
      '*TOTAL*',
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