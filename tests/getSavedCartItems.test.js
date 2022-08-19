const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', async() => {
  it('1 - Verifica se ao executar getSavedCartItems o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    await getSavedCartItems()
    expect(await localStorage.setItem()).toBeCalled();
  });

  it('2 - Verifica se ao executar getSavedCartItems o método localStorage.setItem é chamado com `cartItems`', async() => {
    expect.assertions(1);
    await getSavedCartItems();
    expect(await localStorage.setItem()).toHaveBeenCalledWith('cartItems');
  });
});
