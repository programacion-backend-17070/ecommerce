function getProducts() {
  return fetch("/api/products")
    .then(r => r.json())
}

function attachProduct(p) {
  return `
    <div>
     <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
        <img src="/static/img/${p.img}" width='1800' height='1200' alt=''/>
      </div>
      <div class="uk-card-body">
        <h3 class="uk-card-title">${p.name}</h3>
        <h5>MXN ${p.price}</h5>
        <span class="uk-badge">${p.platform}</span>
        <p>${p.description}</p>
        <button class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>
      </div>
     </div>
    </div>
  `
}

const productsContainer = document.getElementById('products')
productsContainer.innerHTML = '<p>Cargando...</p>'

window.onload = async () => {
  await updateCartBadge()

  const prods = await getProducts()
  productsContainer.innerHTML = ''
  productsContainer.innerHTML = prods.reduce((el, p) => el += attachProduct(p), '')
}