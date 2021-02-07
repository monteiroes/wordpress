/* Validação de CEP */
function validateCep(cep) {
  const regex = /[\.\-\/]+/g;
  cep = cep.replace(regex, "");
  var cepRegex = /^[0-9]{8}$/g;
  return cepRegex.test(cep);
}
