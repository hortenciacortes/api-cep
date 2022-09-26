import { useState } from 'react';
import './App.css';
import Cepdb from './Cepdb';
import lookinCepImg from './images/lookingCep.svg';
import cepImg from './images/cep.svg';
import warningImg from './images/warning.svg';

interface Cep {
  status: number;
  ok: Boolean;
  message: string;
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;
  statusText: string
}

function App() {
  const [dataCep, setDataCep] = useState<Cep>({
    status: 0,
    ok: false,
    message: '',
    code: '',
    state: '',
    city: '',
    district: '',
    address: '',
    statusText: '',
  });
  const [numberCep, setNumberCep] = useState<string>('');

  async function pesquisar(){
    const erro = document.querySelector('.error') as HTMLElement;
    const message = document.querySelector('.message') as HTMLElement;
    const image = document.querySelector('img') as HTMLElement;
    const info = document.querySelector('.infos') as HTMLElement;

    if(numberCep.length === 0){
      erro.innerHTML = 'Digite o CEP';
    }else {
      const list: Cep = await Cepdb.GetCep(numberCep)

      if(list.status !== 200) {
        message.innerHTML = `Desculpe, algo deu errado: ${list.message}`;
        image.setAttribute('src', `${warningImg}`)
        info.classList.remove('active');
      }else {
        setDataCep(list)
        message.innerHTML = ''
        image.setAttribute('src', `${cepImg}`);
        info.classList.add('active');
      }
      erro.innerHTML = ''
    }
  }
  
  return (
    <section className="container">
      <div className="form">
        <label htmlFor="cep">Informe o CEP: </label>
        <input 
          id="cep" name="cep" 
          placeholder="CEP" 
          maxLength={9} minLength={8} 
          onChange={e => setNumberCep(e.target.value)} 
        />
        <small className="error"></small>
        <button onClick={pesquisar}>Pesquisar</button>
      </div>
      <div className="infos-container">
        <div className="infos-cep">
          <p className="message"></p>
          <div className="infos">
            <p>CEP: <strong>{dataCep.code}</strong></p>
            <p>Endereço: <strong>{dataCep.address}</strong></p>
            <p>Bairro: <strong>{dataCep.district}</strong></p>
            <p>Cidade: <strong>{dataCep.city}</strong></p>
            <p>Estado: <strong>{dataCep.state}</strong></p>
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
