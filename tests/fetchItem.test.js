require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verificar se `fetchItem` é uma função', async () => {
    expect.assertions(1);
    await fetchItem();
    expect(typeof fetchItem).toBe('function');
  });

  it('1 - Verificar se ao executar `fetchItem`com o argumento `MLB1615760527` a função `fetch` é chamada ', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('2 - Verificar se ao executar `fetchItem`com o argumento `MLB1615760527` a função `fetch` utiliza o endpoint `https://api.mercadolibre.com/items/MLB1615760527`', async () => {
    expect.assertions(1);
    const url = `https://api.mercadolibre.com/items/MLB1615760527`
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });

  it('3 - Verificar o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect.assertions(1);
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toEqual(item);
  });

  it('4 - Verificar se ao chamar a função `fetchItem` sem argumento retorna um erro com a mensagem `You must provide an url`', async () => {
    expect.assertions(1);
    const chamadaFunção = await fetchItem();
    expect(chamadaFunção).toEqual(new Error('You must provide an url'));
  });
});
