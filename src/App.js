import { useState } from 'react';
import './App.css';
import Cepdb from './Cepdb';
import lookinCepImg from './images/lookingCep.svg';
import cepImg from './images/cep.svg';
import warningImg from './images/warning.svg';

function App() {
  const [infoCep, setInfoCep] = useState([])
  const [numberCep, setNumberCep] = useState([])

  async function pesquisar(){
    if(numberCep.length === 0){
      document.querySelector('.error').innerHTML = 'Digite o CEP'
    }else{
      const list = await Cepdb.GetCep(numberCep)
      if(list.status != 200){
        document.querySelector('.message').innerHTML = `Desculpe, algo deu errado: ${list.message}`
        document.querySelector('img').setAttribute('src', `${warningImg}`)
        document.querySelector('.infos').classList.remove('active');
      }else{
        setInfoCep(list)
        document.querySelector('.message').innerHTML = ''
        document.querySelector('img').setAttribute('src', `${cepImg}`)
        document.querySelector('.infos').classList.add('active');
      }
      document.querySelector('.error').innerHTML = ''
    }
  }

  return (
    <section className="container">
      <div className="form">
        <label for="cep">Informe o CEP: </label>
        <input id="cep" name="cep"  onChange={e => setNumberCep(e.target.value)} placeholder="CEP" maxLength="9" minLength="8"></input>
        <small className="error"></small>
        <button onClick={pesquisar}>Pesquisar</button>
      </div>
      <div className="infos-container">
        <div className="infos-cep">
          <p className="message"></p>
          <div className="infos">
            <p>CEP: <strong>{infoCep.code}</strong></p>
            <p>Endereço: <strong>{infoCep.address}</strong></p>
            <p>Bairro: <strong>{infoCep.district}</strong></p>
            <p>Cidade: <strong>{infoCep.city}</strong></p>
            <p>Estado: <strong>{infoCep.state}</strong></p>
          </div>
        </div>
        <div className="image">
          <img src={lookinCepImg} alt="Imagem de uma mulher com uma lupa" />
        </div>
      </div>
    </section>
  );
}

export default App;
