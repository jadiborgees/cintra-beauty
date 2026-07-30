import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  readonly whatsAppLink =
    'https://wa.me/5515988239922?text=' +
    encodeURIComponent(
      'Olá! 👋\n\nTenho interesse em conhecer os perfumes da Elegance Cintra Beauty. Poderia me ajudar?'
    );

}