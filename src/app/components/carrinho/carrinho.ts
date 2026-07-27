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


interface EnderecoViaCep {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}


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


  /* ========================================
     CARRINHO
  ======================================== */

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


  /* ========================================
     CLIENTE
  ======================================== */

  readonly nomeCliente =
    signal('');

  readonly erroNome =
    signal('');


  /* ========================================
     CEP
  ======================================== */

  readonly cep =
    signal('');

  readonly erroCep =
    signal('');

  readonly opcoesFrete =
    signal<OpcaoFrete[]>([]);


  /* ========================================
     ENDEREÇO
  ======================================== */

  readonly enderecoEncontrado =
    signal(false);

  readonly logradouro =
    signal('');

  readonly bairro =
    signal('');

  readonly cidade =
    signal('');

  readonly uf =
    signal('');

  readonly numero =
    signal('');

  readonly complemento =
    signal('');


  /* ========================================
     FECHAR CARRINHO
  ======================================== */

  fechar(): void {
    this.carrinhoService.fechar();
  }


  /* ========================================
     QUANTIDADE
  ======================================== */

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


  /* ========================================
     CALCULAR FRETE + BUSCAR ENDEREÇO
  ======================================== */

  async calcularFrete(): Promise<void> {

    const cepLimpo =
      this.cep().replace(/\D/g, '');

    if (cepLimpo.length !== 8) {

      this.erroCep.set(
        'Digite um CEP válido com 8 números.'
      );

      this.limparEndereco();

      this.opcoesFrete.set([]);

      this.carrinhoService.limparFrete();

      return;
    }


    this.erroCep.set('');

    this.enderecoEncontrado.set(false);


    try {

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível consultar o CEP.'
        );
      }


      const endereco: EnderecoViaCep =
        await resposta.json();


      /* CEP NÃO ENCONTRADO */

      if (endereco.erro) {

        this.erroCep.set(
          'CEP não encontrado. Confira e tente novamente.'
        );

        this.limparEndereco();

        this.opcoesFrete.set([]);

        this.carrinhoService.limparFrete();

        return;
      }


      /* PREENCHE ENDEREÇO */

      this.logradouro.set(
        endereco.logradouro ?? ''
      );

      this.bairro.set(
        endereco.bairro ?? ''
      );

      this.cidade.set(
        endereco.localidade ?? ''
      );

      this.uf.set(
        endereco.uf ?? ''
      );

      this.enderecoEncontrado.set(true);


      /* CALCULA FRETE */

      const opcoes =
        this.freteService.calcular(
          cepLimpo
        );

      this.opcoesFrete.set(
        opcoes
      );

      this.carrinhoService.limparFrete();

    } catch (erro) {

      console.error(
        'Erro ao consultar CEP:',
        erro
      );

      this.erroCep.set(
        'Não foi possível consultar o CEP agora. Tente novamente.'
      );

      this.limparEndereco();

      this.opcoesFrete.set([]);

      this.carrinhoService.limparFrete();
    }
  }


  /* ========================================
     LIMPAR ENDEREÇO
  ======================================== */

  private limparEndereco(): void {

    this.enderecoEncontrado.set(false);

    this.logradouro.set('');

    this.bairro.set('');

    this.cidade.set('');

    this.uf.set('');

    this.numero.set('');

    this.complemento.set('');
  }


  /* ========================================
     SELECIONAR FRETE
  ======================================== */

  selecionarFrete(
    frete: OpcaoFrete
  ): void {

    this.carrinhoService.selecionarFrete(
      frete
    );
  }


  /* ========================================
     FINALIZAR PEDIDO
  ======================================== */

  finalizarPedido(): void {

    /* NOME */

    const nome =
      this.nomeCliente().trim();

    if (!nome) {

      this.erroNome.set(
        'Informe seu nome antes de finalizar.'
      );

      return;
    }

    this.erroNome.set('');


    /* CARRINHO + FRETE */

    const freteSelecionado =
      this.frete();

    if (
      this.itens().length === 0 ||
      !freteSelecionado
    ) {
      return;
    }


    /* CEP */

    const cepInformado =
      this.cep().trim();

    if (!cepInformado) {

      this.erroCep.set(
        'Informe seu CEP antes de finalizar.'
      );

      return;
    }


    /* ENDEREÇO */

    if (!this.enderecoEncontrado()) {

      this.erroCep.set(
        'Calcule o CEP antes de finalizar.'
      );

      return;
    }


    /* NÚMERO OBRIGATÓRIO */

    const numeroInformado =
      this.numero().trim();

    if (!numeroInformado) {

      this.erroCep.set(
        'Informe o número do endereço.'
      );

      return;
    }


    this.erroCep.set('');


    /* ========================================
       WHATSAPP
    ======================================== */

    this.whatsappService.abrirPedido(
      this.itens(),
      nome,
      cepInformado,
      this.logradouro(),
      numeroInformado,
      this.complemento().trim(),
      this.bairro(),
      this.cidade(),
      this.uf(),
      freteSelecionado,
      this.total()
    );
  }
}