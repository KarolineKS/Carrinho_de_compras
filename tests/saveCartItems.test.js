const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', async() => {
  it('1 - Verifica se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    const argumento = <ol><li>Item</li></ol>;
    await saveCartItems(argumento);
    expect(await localStorage.setItem()).toBeCalled();
  });

  it('2 - Verifica se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', async() => {
    expect.assertions(2);
    const argumento = <ol><li>Item</li></ol>;
    await saveCartItems(argumento);
    expect(await localStorage.setItem()).toHaveBeenNthCalledWith(1,'cartItems');
    expect(await localStorage.setItem()).toHaveBeenNthCalledWith(2, saveCartItems); 
  });
});
