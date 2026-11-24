import { useState, useEffect } from 'react'
import api from './services/api'
import CepCard from './components/CepCard'
import './App.css'

function App() {
  const [cep, setCep] = useState('')
  const [enderecos, setEnderecos] = useState([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function buscarCep(valorCep) {
    const cepLimpo = valorCep.replace(/\D/g, '')

    if (!cepLimpo) {
      setErro('Informe um CEP.')
      return
    }

    if (cepLimpo.length !== 8) {
      setErro('CEP inválido. Digite os 8 números.')
      return
    }

    try {
      setLoading(true)
      setErro('')

      const { data } = await api.get(`/${cepLimpo}/json/`)

      // ViaCEP retorna 200 mesmo quando o CEP não existe
      if (data.erro) {
        setErro('CEP não encontrado.')
        return
      }

      setEnderecos((atual) => {
        const semRepetido = atual.filter((item) => item.cep !== data.cep)
        return [data, ...semRepetido]
      })

      setCep('')
    } catch {
      setErro('Erro ao buscar o CEP. Verifique sua conexão.')
    } finally {
      setLoading(false)
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
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {loading && enderecos.length === 0 && <p className="info">Buscando...</p>}

      <div className="lista-ceps">
        {enderecos.map((item) => (
          <CepCard key={item.cep} endereco={item} />
        ))}
      </div>
    </main>
  )
}

export default App