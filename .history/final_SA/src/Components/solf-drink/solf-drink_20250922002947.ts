import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solf-drink',
  imports: [CurrencyPipe, NgFor],
  templateUrl: './solf-drink.html',
  styleUrl: './solf-drink.css',
})
export class SolfDrink {
  product_solft_drinks = [
    {
      img: 'https://webassets.meowwolf.com/cdn.prod/5daf07de1a61d008bdf579d8/60368a3dd74b5d4fadcd4091_RhkaUa-ZTSfJj0Rv5rRJP9wbPnQ-htAow9ZhXqTihsYNv3wu8qMMUuWejYXjyBFf_sVwfV4inStfS-A84qvs6WsgOwOuj2EC4zyi0mFHGih9PoCgni4ijSK_0_IYUWb7xH0XtaEy.jpeg',
      name: 'Product 1',
      price: 25,
      description: 'A beautiful piece of artwork from Meow Wolf.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Product 2',
      price: 15,
      description: 'Default placeholder product with no image.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Product 3',
      price: 12,
      description: 'Another simple placeholder product.',
    },
  ];
}
