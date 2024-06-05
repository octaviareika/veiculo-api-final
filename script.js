var url = 'http://localhost:8080'; // URL do servidor

export default function getDados(rotas) {
    return fetch(`${url}${rotas}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao acessar a rota' + error);
        })


}

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
                            <h2 class="h2-veiculo">${veiculo.modelo}</h2>
                            <p class="p-veiculos paragrafo">${veiculo.marca}</p>
                            <p class="p-veiculos valor">R$ ${veiculo.valor}</p>
                        </li>
                    `).join('');
        
                    ulNova.innerHTML = listaHTML; // Adiciona o conteúdo da lista
                    elemento.appendChild(ulNova); // Adiciona a lista ao elemento
    }
}





geraVeiculos();
function geraVeiculos(){
    var urls = ['/veiculos', '/veiculos/recentes', '/veiculos/economicos'];

    try {
        Promise.all(urls.map(url => getDados(url)))
        .then(respostas => {
            respostas.forEach((resposta, indice) => {
                criaListaVeiculos(datasSecao[Object.keys(datasSecao)[indice]], resposta);
            });

            // Limite de itens a serem exibidos inicialmente
            const limite = 5;

            // Seleciona a seção "todos"
            const secaoTodos = document.querySelector('[data-name=todos]');

            // Seleciona todos os itens na seção "todos"
            const itensTodos = secaoTodos.querySelectorAll('.veiculo');

            // Oculta todos os itens que estão acima do limite
            for (let i = limite; i < itensTodos.length; i++) {
                itensTodos[i].style.display = 'none';
            }

            const botaoVerMais = secaoTodos.querySelector('.btn-ver-mais');

            botaoVerMais.addEventListener('click', () => {
                
                if (botaoVerMais.innerText === 'Ver mais') {
                    for (let i = limite; i < itensTodos.length; i++) {
                        itensTodos[i].style.display = 'block';
                    }
                    botaoVerMais.innerText = 'Ver menos';
                } else {
                    //oculta todos os itens que estão acima do limite
                    for (let i = limite; i < itensTodos.length; i++) {
                        itensTodos[i].style.display = 'none';
                    }
                    botaoVerMais.innerText = 'Ver mais';
                }
                
            });
        });

       
    } catch (error) {
        console.log(error);
    }
}

