var url = 'http://localhost:8080'; // URL do servidor

export default function getDados(rotas) {
    return fetch(`${url}${rotas}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao acessar a rota' + error);
        })


}