import { PokemonAppPage } from './app.po';

describe('pokemon-app App', () => {
  let page: PokemonAppPage;

  beforeEach(() => {
    page = new PokemonAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
