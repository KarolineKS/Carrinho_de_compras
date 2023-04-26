const fetchProducts = async (produto) => {
  try {
    if (!produto) {
      throw new Error('You must provide an url');
    }
    const caminho = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const resultado = await fetch(caminho);
    const objeto = await resultado.json();
    return objeto;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}