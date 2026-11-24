function CepCard({ endereco }) {
  return (
    <div className="cep-card">
      <div className="cep-topo">
        <strong>{endereco.cep}</strong>
        <span>
          {endereco.localidade} - {endereco.uf}
        </span>
      </div>

      <p className="logradouro">{endereco.logradouro || 'Sem logradouro específico'}</p>

      {endereco.bairro && <p className="detalhe">Bairro: {endereco.bairro}</p>}
      {endereco.complemento && (
        <p className="detalhe">Complemento: {endereco.complemento}</p>
      )}
    </div>
  )
}

export default CepCard