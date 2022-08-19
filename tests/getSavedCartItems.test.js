const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1 - Verifica se ao executar getSavedCartItems o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems()
    expect(localStorage.getItem()).toBeCalled();
  });

  it('2 - Verifica se ao executar getSavedCartItems o método localStorage.setItem é chamado com `cartItems`', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem()).toHaveBeenCalledWith('cartItems');
  });
});
