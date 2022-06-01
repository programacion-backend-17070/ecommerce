const TableComponent = (products) => {
  return(
    <>
      <a href="/"> 
        <button className="uk-margin-remove uk-button uk-button-secondary uk-button-small uk-margin-top">
          Agregar nuevo
        </button>
      </a>
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
              <td>{p.plataform}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
            </tr>))
            : <tr><td>No hay datos</td></tr>
        }
        
      </tbody>
      </table>
    </>
  )
}

export default TableComponent