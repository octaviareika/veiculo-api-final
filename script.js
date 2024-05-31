import getDados from "./js/dados";

var datasSecao = { 
    tudo: document.querySelector('[data-name=todos]'),
    recente: document.querySelector('[data-name=recentes]'),
    economico: document.querySelector('[data-name=economicos]'),
}

function criaListaVeiculos(elemento, data){
    const ulExistente = elemento.querySelector('ul'); // Verifica se já existe uma lista de veículos

    if(ulExistente){
        elemento.removeChild(ulExistente); // Se existir, remove a lista
    }

    else {
        const ulNova = document.createElement('ul'); // Se não existir, cria uma nova lista
        ulNova.classList.add('lista-veiculos'); // Adiciona a classe 'lista-veiculos' à nova lista
        const listaHTML = 
                    data.map(veiculo => `
                        <li class="veiculo">
                            <h2>${veiculo.nome}</h2>
                            <p>${veiculo.ano}</p>
                            <p>R$ ${veiculo.valor}</p>
                        </li>
                    `).join('');
        
                    ulNova.innerHTML = listaHTML; // Adiciona o conteúdo da lista
                    elemento.appendChild(ulNova); // Adiciona a lista ao elemento
    }
}



var luxo = document.querySelector('[data-name=luxo]');
// display noone
luxo.style.display = 'none';




geraVeiculos();
function geraVeiculos(){
    var urls = ['/veiculos/todos', '/veiculos/recentes', '/veiculos/economicos'];

    try {
        Promise.all(urls.map(url => getDados(url)))
        .then(respostas => {
            respostas.forEach((resposta, index) => {
                criaListaVeiculos(datasSecao.tudo, resposta[0]);
                criaListaVeiculos(datasSecao.recente, resposta[1]);
                criaListaVeiculos(datasSecao.economico, resposta[2]);
            });
        });
    } catch (error) {
        console.log(error);
    }
}