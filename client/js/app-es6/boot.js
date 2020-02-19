import { defaultIntance } from './controllers/NegociacaoController';


let negociacaoController = defaultIntance();


document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);

document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);