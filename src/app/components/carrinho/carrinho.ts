import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CarrinhoService } from '../../services/carrinho';

import {
  FreteService,
  OpcaoFrete
} from '../../services/frete';

import { WhatsappService } from '../../services/whatsapp';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho {
  private readonly carrinhoService =
    inject(CarrinhoService);

  private readonly freteService =
    inject(FreteService);

  private readonly whatsappService =
    inject(WhatsappService);

  readonly aberto =
    this.carrinhoService.aberto;

  readonly itens =
    this.carrinhoService.itens;

  readonly subtotal =
    this.carrinhoService.subtotal;

  readonly frete =
    this.carrinhoService.frete;

  readonly total =
    this.carrinhoService.total;

  readonly nomeCliente =
    signal('');

  readonly erroNome =
    signal('');

  readonly cep =
    signal('');

  readonly opcoesFrete =
    signal<OpcaoFrete[]>([]);

  readonly erroCep =
    signal('');

  fechar(): void {
    this.carrinhoService.fechar();
  }

  aumentar(produtoId: number): void {
    this.carrinhoService.aumentarQuantidade(
      produtoId
    );
  }

  diminuir(produtoId: number): void {
    this.carrinhoService.diminuirQuantidade(
      produtoId
    );
  }

  remover(produtoId: number): void {
    this.carrinhoService.remover(
      produtoId
    );
  }

  calcularFrete(): void {
    const cepLimpo =
      this.cep().replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      this.erroCep.set(
        'Digite um CEP válido com 8 números.'
      );

      this.opcoesFrete.set([]);

      this.carrinhoService.limparFrete();

      return;
    }

    this.erroCep.set('');

    const opcoes =
      this.freteService.calcular(
        cepLimpo
      );

    this.opcoesFrete.set(
      opcoes
    );

    this.carrinhoService.limparFrete();
  }

  selecionarFrete(
    frete: OpcaoFrete
  ): void {
    this.carrinhoService.selecionarFrete(
      frete
    );
  }

  finalizarPedido(): void {
    const nome =
      this.nomeCliente().trim();

    if (!nome) {
      this.erroNome.set(
        'Informe seu nome antes de finalizar.'
      );

      return;
    }

    this.erroNome.set('');

    const freteSelecionado =
      this.frete();

    if (
      this.itens().length === 0 ||
      !freteSelecionado
    ) {
      return;
    }

    const cepInformado =
      this.cep().trim();

    if (!cepInformado) {
      this.erroCep.set(
        'Informe seu CEP antes de finalizar.'
      );

      return;
    }

    this.erroCep.set('');

    this.whatsappService.abrirPedido(
      this.itens(),
      nome,
      cepInformado,
      freteSelecionado,
      this.total()
    );
  }
}