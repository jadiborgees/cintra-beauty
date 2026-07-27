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
      imagem: '/sauvage-dior.png',
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
      imagem: '/good-girl-carolina-herrera.png',
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
      imagem: '/bleu-de-chanel.png',
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
      imagem: '/libre-yves-saint-laurent.png',
      estoque: 7,

      familiaOlfativa: 'Floral',
      intensidade: 'Forte',
      ocasiao: 'Noite',

      destaque: true,
      novidade: true
    },

    {
      id: 5,
      nome: 'CK One',
      slug: 'ck-one',
      marca: 'Calvin Klein',
      categoria: 'Importados',
      genero: 'Unissex',
      volume: '100ml',
      preco: 399.9,
      imagem: '/ck-one-calvin-klein.png',
      estoque: 10,

      familiaOlfativa: 'Cítrico',
      intensidade: 'Suave',
      ocasiao: 'Dia'
    },

    {
      id: 6,
      nome: '4711 Original Eau de Cologne',
      slug: '4711-original',
      marca: '4711',
      categoria: 'Importados',
      genero: 'Unissex',
      volume: '100ml',
      preco: 249.9,
      imagem: '/4711-original.png',
      estoque: 8,

      familiaOlfativa: 'Cítrico',
      intensidade: 'Suave',
      ocasiao: 'Dia'
    },

    {
      id: 7,
      nome: 'Tous Kids Girl',
      slug: 'tous-kids-girl',
      marca: 'Tous',
      categoria: 'Infantil',
      genero: 'Infantil',
      volume: '100ml',
      preco: 299.9,
      imagem: '/tous-kids-girl.png',
      estoque: 6,

      familiaOlfativa: 'Frutado',
      intensidade: 'Suave',
      ocasiao: 'Dia'
    },

    {
      id: 8,
      nome: 'Bvlgari Petits et Mamans',
      slug: 'bvlgari-petits-et-mamans',
      marca: 'Bvlgari',
      categoria: 'Infantil',
      genero: 'Infantil',
      volume: '100ml',
      preco: 449.9,
      imagem: '/bvlgari-petits-et-mamans.png',
      estoque: 5,

      familiaOlfativa: 'Floral',
      intensidade: 'Suave',
      ocasiao: 'Dia'
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