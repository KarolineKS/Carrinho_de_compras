const fetchItem = async (itemID) => {
  try {
    if (!itemID) {
      throw new Error('You must provide an url');
    }
    const endpoint = 'https://api.mercadolibre.com/items/';
    const url = `${endpoint}${itemID}`;
    const retorno = await fetch(url);
    const retornoJSON = await retorno.json();
    return retornoJSON;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
