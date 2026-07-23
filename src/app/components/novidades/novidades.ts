import { Component, inject } from '@angular/core';

import { ProdutoService } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-novidades',
  imports: [CardProduto],
  templateUrl: './novidades.html',
  styleUrl: './novidades.css'
})
export class Novidades {
  private readonly produtoService = inject(ProdutoService);

  readonly produtos =
    this.produtoService.buscarNovidades();
}