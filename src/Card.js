import React from 'react'

const Card = ({ id, nome, valor, tipo, onClick }) => {

    return (
        <div className='card' id={id}>
            <div className='esquerda'>
                <h3>Nome: {nome}</h3>
                <p>Valor: R${valor}</p>
                <p>Pagamento: {tipo}</p>
            </div>
            <div className='direita'>
                <button className='btnDel' onClick={onClick}>Apagar</button>
            </div>

        </div>
    )
}

export default Card
