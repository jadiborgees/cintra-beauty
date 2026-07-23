import { Injectable, signal } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly produtosSignal = signal<Produto[]>([
    {
      id: 1,
      nome: 'Sauvage EDP',
      slug: 'sauvage-edp',
      marca: 'Dior',
      categoria: 'Importados',
      genero: 'Masculino',
      volume: '100ml',
      preco: 699.9,
      imagem: '/produtos/sauvage.png',
      estoque: 10,

      familiaOlfativa: 'Aromático',
      intensidade: 'Forte',
      ocasiao: 'Noite',

      maisVendido: true,
      destaque: true
    },

    {
      id: 2,
      nome: 'Good Girl Blush',
      slug: 'good-girl-blush',
      marca: 'Carolina Herrera',
      categoria: 'Importados',
      genero: 'Feminino',
      volume: '80ml',
      preco: 629.9,
      imagem: '/produtos/good-girl-blush.png',
      estoque: 8,

      familiaOlfativa: 'Floral',
      intensidade: 'Moderado',
      ocasiao: 'Ambos',

      maisVendido: true
    },

    {
      id: 3,
      nome: 'Bleu de Chanel EDP',
      slug: 'bleu-de-chanel-edp',
      marca: 'Chanel',
      categoria: 'Importados',
      genero: 'Masculino',
      volume: '100ml',
      preco: 849.9,
      imagem: '/produtos/bleu-de-chanel.png',
      estoque: 6,

      familiaOlfativa: 'Amadeirado',
      intensidade: 'Moderado',
      ocasiao: 'Ambos',

      novidade: true
    },

    {
      id: 4,
      nome: 'Libre EDP',
      slug: 'libre-edp',
      marca: 'Yves Saint Laurent',
      categoria: 'Importados',
      genero: 'Feminino',
      volume: '90ml',
      preco: 759.9,
      imagem: '/produtos/libre.png',
      estoque: 7,

      familiaOlfativa: 'Floral',
      intensidade: 'Forte',
      ocasiao: 'Noite',

      destaque: true,
      novidade: true
    }
  ]);

  readonly produtos =
    this.produtosSignal.asReadonly();

  buscarPorSlug(slug: string): Produto | undefined {
    return this.produtosSignal().find(
      produto => produto.slug === slug
    );
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtosSignal().find(
      produto => produto.id === id
    );
  }

  buscarMaisVendidos(): Produto[] {
    return this.produtosSignal().filter(
      produto => produto.maisVendido
    );
  }

  buscarNovidades(): Produto[] {
    return this.produtosSignal().filter(
      produto => produto.novidade
    );
  }
}