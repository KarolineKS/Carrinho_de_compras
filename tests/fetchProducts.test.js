require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1 - Verifica se `fetchProducts` é uma função', async () => {
    expect.assertions(1);
    await fetchProducts();
    expect(typeof fetchProducts).toBe('function');
  })

  it('2 - Verifica se `fetch` foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  it('3 - Verifica se ao chamar a função `fetchProduts` a função `fetch` utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(url);
  })

  it('4 - Verifica se a função `fetchProducts` com argumento `computador` retorna o objeto esperado', async () => {
    expect.assertions(1);
    const retorno = await fetchProducts('computador');
    expect(retorno).toEqual(computadorSearch);
  })

  it('5 - Verifica se a função `fetchProducts` sem argumento retorna um erro com a mensagem `You must provide an url`', async () => {
    expect (await fetchProducts()).toEqual(new Error ('You must provide an url'))
    expect.assertions(1)
  })
});
