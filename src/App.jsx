import { useState, useEffect } from 'react'
import api from './services/api'
import CepCard from './components/CepCard'

function App() {
  const [cep, setCep] = useState('')
  const [enderecos, setEnderecos] = useState([])

  async function buscarCep(valorCep) {
    const cepLimpo = valorCep.replace(/\D/g, '')
    if (cepLimpo.length !== 8) return

    const { data } = await api.get(`/${cepLimpo}/json/`)
    if (!data.erro) {
      setEnderecos((atual) => [data, ...atual])
    }
  }

  useEffect(() => {
    buscarCep('01310-100')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    buscarCep(cep)
  }

  return (
    <main className="container">
      <h1>Consulta de CEP</h1>

      <form className="form-busca" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o CEP (ex: 01310-100)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={9}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="lista-ceps">
        {enderecos.map((item) => (
          <CepCard key={item.cep} endereco={item} />
        ))}
      </div>
    </main>
  )
}

export default App