async function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge')

  const currentResponse = await fetch("/api/user/current")
  const user = await currentResponse.json()

  const cartLengthResponse = await fetch(`/api/cart/${user.cartId}`)
  const cart = await cartLengthResponse.json()
  
  cartBadge.innerText = cart.products.length
}

async function addToCart(cartId, productId) {
  const res = await fetch(`/api/cart/${cartId}/${productId}`, { method: 'POST' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()
}

async function removeFromCart(cartId, productId) {
  const res = await fetch(`/api/cart/${cartId}/${productId}`, { method: 'DELETE' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()

  const el = document.getElementById(productId)
  el.parentElement.removeChild(el)
}