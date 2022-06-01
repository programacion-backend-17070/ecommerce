import { useEffect, useState } from "react"
import axios from "axios";

import TableComponent from "../components/Table";
import NavComponent from "../components/Nav";

function Home() {
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    platform: '',
    description: '',
    price: ''
  })

  const getProducts = () => {
    console.log('getProducts')
    // return [{ name: 1 }]
    axios.get("http://localhost:8080/api/products")
      .then(({ data }) => setProducts(data))
  }

  const borrarProducto = (id) => {
    axios.delete("http://localhost:8080/api/products/" + id)
    .then(({ data }) => {
      console.log(data)
      setProducts(products.filter(p => p.id !== id))
      alert("producto borrado")
    }).catch((err) => {
      console.log(err)
      alert('no se pudo borrar ' + id)
    }) 
  }

  const agregarNuevo = (e) => {
    e.preventDefault()
    console.log(newProduct)
    axios.post("http://localhost:8080/api/products", newProduct)
    .then(({ data }) => {
      console.log(data)
      products.push({
        ...newProduct,
        id: data.id
      })
      setProducts(products)
      alert("producto agregado")
      setNewProduct({
        name: '',
        platform: '',
        description: '',
        price: ''
      })
    }).catch((err) => {
      console.log(err)
      alert('no se pudo agregar ' + newProduct.name)
    }) 
    
  }

  useEffect(getProducts, [])

  return (
    <div className="uk-container uk-width-1-1 uk-padding-remove uk-margin-remove">
      <NavComponent />
      <div className="uk-width-1-1 uk-margin-remove uk-align-center uk-text-break uk-padding">
        <h2>Admin</h2>
        {/* {products.map(p => <span>{p.name}</span>)} */}
        {/* <TableComponent products={products}/> */}
        {/* <a href="/"> 
          <button className="uk-margin-remove uk-button uk-button-secondary uk-button-small uk-margin-top">
            Agregar nuevo
          </button>
        </a> */}
        <table className="uk-table uk-table-divider uk-margin-top">
          <thead>
            <tr>
                <th>Nombre</th>
                <th>Plataforma</th>
                <th>Descripcion</th>
                <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.length ? products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.platform}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td onClick={() => borrarProducto(p.id)}><button>Borrar</button></td>
                </tr>))
                : <tr><td>No hay datos</td></tr>
            }
            
          </tbody>
        </table>
        <div  className="uk-margin-top">
          <form  className="uk-form-stacked">
            <div  className="uk-margin">
              <label  className="uk-form-label"  htmlFor="form-stacked-text">Nombre</label>
              <div  className="uk-form-controls">
                <input  className="uk-input" id="form-stacked-nombre" type="text" value={newProduct.name} onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value
                  })
                }} name="name" />
              </div>
            </div>
            <div  className="uk-margin"><label  className="uk-form-label"  htmlFor="form-stacked-select">Plataforma</label>
                <div  className="uk-form-controls"><select  className="uk-select" id="form-stacked-plataforma" value={newProduct.platform} select={newProduct.platform} onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    platform: e.target.value
                  })
                }} name="platform">
                        <option value=""></option>
                        <option value="PS4">PS4</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                    </select></div>
            </div>
            <div  className="uk-margin"><label  className="uk-form-label"  htmlFor="form-stacked-text">Precio</label>
              <div  className="uk-form-controls"><input  className="uk-input" id="form-stacked-precio" type="number" value={newProduct.price} onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value
                  })
                }} name="price" /></div>
            </div>
            <div  className="uk-margin"><label  className="uk-form-label"  htmlFor="form-stacked-text">Description</label>
                <div  className="uk-form-controls"><textarea  className="uk-textarea" id="form-stacked-description" rows="5" name="description" value={newProduct.description} onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value
                  })
                }}></textarea></div>
            </div>
            <button  className="uk-button uk-button-secondary uk-button-small uk-margin-top" onClick={agregarNuevo}>Agregar</button>
          </form>
      </div>
      </div>
    </div>
  );
}

export default Home;
