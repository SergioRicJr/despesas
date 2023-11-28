import './App.css';
import {useState} from 'react'
import Card from './Card';

function App() {
  const [totalDespesa, setTotalDespesa] = useState(0)
  const [totalReceita, setTotalReceita] = useState(0)
  const [registrosReceita, setRegistrosReceita] = useState([])
  const [registrosDespesa, setRegistrosDespesa] = useState([]) 
  
  function gerarValorAleatorio() {
    const parteAleatoria = Math.random().toString(36).substring(2, 15);
    const timestamp = new Date().getTime();
    const valorAleatorio = parteAleatoria + timestamp;
  
    return valorAleatorio;
  }


  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    valor: '',
    tipo: 'despesa',
    formaPagamento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = gerarValorAleatorio()
    // Aqui você pode enviar os dados para o backend ou realizar qualquer outra lógica desejada
    if (dadosFormulario.tipo === 'despesa') {
      setTotalDespesa(prev => prev + Number.parseFloat(dadosFormulario.valor))
      registrosDespesa.push({...dadosFormulario, ...{"id": id}})
    } else if (dadosFormulario.tipo === 'receita') {
      setTotalReceita(prev => prev + Number.parseFloat(dadosFormulario.valor))
      registrosReceita.push({...dadosFormulario, ...{"id": id}})
    }
  };

  function handleDeleteRegistro(id, tipo, valor) {
    if (tipo === 'despesa') {
      setRegistrosDespesa(
        prev => prev.filter((value)=> value.id !== id)
      )
      setTotalDespesa(prev => prev - valor)
    } else if (tipo === 'receita') {
      setRegistrosReceita(
        prev => prev.filter((value)=> value.id !== id)
      )
      setTotalReceita(prev => prev - valor)
    }

  }

  return (
    <div className="App">
      <div className="section">
        <div className='titulos'>
          <h1>Cadastro</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={dadosFormulario.nome} onChange={handleChange} />
        </label>

        <br />

        <label>
          Valor:
          <input type="number" name="valor" value={dadosFormulario.valor} onChange={handleChange} />
        </label>

        <br />

        <label>
          Tipo:
          <select name="tipo" value={dadosFormulario.tipo} onChange={handleChange}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </label>

        <br />

        <label>
          Forma de Pagamento:
          <input
            type="text"
            name="formaPagamento"
            value={dadosFormulario.formaPagamento}
            onChange={handleChange}
          />
        </label>

        <br />

        <button type="submit">Enviar</button>
      </form>
      </div>

      <div className="section">
        <div className='titulos'>
          <h1>Receita</h1>
          <p>Total: {totalReceita}</p>
        </div>

        <div className='areacards'>
          {
            registrosReceita.map((registro)=> {return (
              <Card nome={registro.nome} valor={registro.valor} tipo={registro.formaPagamento} onClick={()=>handleDeleteRegistro(registro.id, registro.tipo, registro.valor)}/>
            )})
          }
        </div>
        
      </div>

      <div className="section">
        <div className='titulos'>
          <h1>Despesa</h1>
          <p>Total: {totalDespesa}</p>
        </div>

        <div className='areacards'>
          {
            registrosDespesa.map((registro)=> {return (
              <Card nome={registro.nome} valor={registro.valor} tipo={registro.formaPagamento} onClick={()=>handleDeleteRegistro(registro.id, registro.tipo, registro.valor)}/>
            )})
          }
        </div>
        
      </div>
    </div>
  );
}

export default App;
