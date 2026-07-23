import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { ProdutoService } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-consultora',
  imports: [CardProduto],
  templateUrl: './consultora.html',
  styleUrl: './consultora.css'
})
export class Consultora {
  private readonly produtoService =
    inject(ProdutoService);

  readonly etapa = signal(1);

  readonly genero = signal('');
  readonly familia = signal('');
  readonly intensidade = signal('');
  readonly ocasiao = signal('');
  readonly precoMaximo = signal(1000);

  readonly resultado = computed(() => {
    return this.produtoService.produtos().filter(produto => {
      const generoOk =
        !this.genero() ||
        produto.genero === this.genero();

      const familiaOk =
        !this.familia() ||
        produto.familiaOlfativa === this.familia();

      const intensidadeOk =
        !this.intensidade() ||
        produto.intensidade === this.intensidade();

      const ocasiaoOk =
        !this.ocasiao() ||
        produto.ocasiao === this.ocasiao() ||
        produto.ocasiao === 'Ambos';

      const precoOk =
        produto.preco <= this.precoMaximo();

      return (
        generoOk &&
        familiaOk &&
        intensidadeOk &&
        ocasiaoOk &&
        precoOk
      );
    });
  });

  avancar(): void {
    if (this.etapa() < 6) {
      this.etapa.update(valor => valor + 1);
    }
  }

  voltar(): void {
    if (this.etapa() > 1) {
      this.etapa.update(valor => valor - 1);
    }
  }

  reiniciar(): void {
    this.etapa.set(1);

    this.genero.set('');
    this.familia.set('');
    this.intensidade.set('');
    this.ocasiao.set('');
    this.precoMaximo.set(1000);
  }

  selecionarGenero(valor: string): void {
    this.genero.set(valor);
    this.avancar();
  }

  selecionarFamilia(valor: string): void {
    this.familia.set(valor);
    this.avancar();
  }

  selecionarIntensidade(valor: string): void {
    this.intensidade.set(valor);
    this.avancar();
  }

  selecionarOcasiao(valor: string): void {
    this.ocasiao.set(valor);
    this.avancar();
  }

  selecionarPreco(valor: number): void {
    this.precoMaximo.set(valor);
    this.avancar();
  }
}