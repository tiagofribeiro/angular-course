import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Teste',
      'Teste de descrição',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [
        new Ingredient('Carne', 1),
        new Ingredient('Tomate', 2),
        new Ingredient('Cebola', 1)
      ]),
    new Recipe(
      'Outro Teste',
      'Mais um teste de descrição',
      'https://gooutside-static-cdn.akamaized.net/wp-content/uploads/sites/3/2020/02/comida-porcaria-efeito-no-cerebro.jpg',
      [
        new Ingredient('Batata', 2),
        new Ingredient('Rosquinhas', 2),
        new Ingredient('Sorvete', 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // slices são cópias dos dados recuperados
    return this.recipes.slice()[index];
  }

  addIngredientToList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
