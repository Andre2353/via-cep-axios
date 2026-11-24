# Consulta de CEP

Projeto simples em React + Vite consumindo a API do [ViaCEP](https://viacep.com.br/) com Axios.

## O que tem no projeto

- Busca de endereço por CEP usando Axios (`axios.create`)
- Carregamento inicial com um CEP padrão (`01310-100`) no `useEffect`
- Tratamento para CEP inválido, inexistente ou erro de rede
- Exibição dos endereços consultados em cards

## Tecnologias

- React 18
- Vite
- Axios

## Estrutura

- `src/services/api.js` - configuração base do Axios para o ViaCEP
- `src/components/CepCard.jsx` - componente para exibir os dados de cada endereço
- `src/App.jsx` - estado da aplicação e busca na API
- `src/App.css` - estilos da página e responsividade

## Como rodar

```bash
npm install
npm run dev
```

Depois é só abrir o link mostrado no terminal (normalmente `http://localhost:5173`).
