import { PokedexOnsenPage } from './app.po';

describe('pokedex-onsen App', () => {
  let page: PokedexOnsenPage;

  beforeEach(() => {
    page = new PokedexOnsenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
