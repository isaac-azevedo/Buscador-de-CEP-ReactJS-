import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import "./styles.css";
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    //https://viacep.com.br/ws/01001000/json/

    if(input === '') {
      alert('Digite um CEP válido!');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      console.log(response.data);


    }catch{
      alert('Ops! algum erro aconteceu');
      setInput("");
    }
  }

  return (
    <div className= "container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
        
      </div>
      
      {Object.keys(cep).length > 0 && (

        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento === '' ? 'sem complemento' : cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}



    </div>
  );
}

export default App;
