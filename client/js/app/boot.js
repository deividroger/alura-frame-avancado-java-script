'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var defaultIntance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      defaultIntance = _controllersNegociacaoController.defaultIntance;
    }],
    execute: function () {
      negociacaoController = defaultIntance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);

      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map