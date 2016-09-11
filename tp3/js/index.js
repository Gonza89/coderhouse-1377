function sumar(n1, n2) {
  console.log(n1 + n2);
}
function restar(n1, n2){
  console.log(n1 - n2);
}
function multiplicar(n1, n2) {
  console.log(n1 * n2);
}
function dividir(n1, n2) {
  console.log(n1 / n2);
}

var valor1 = parseInt(prompt('ingresar un numero: '));
var valor2 = parseInt(prompt('ingresar otro numero: '));
var operacion = prompt('ingresar una operacion: ');

switch (operacion) {
  case '+':
    sumar(valor1, valor2);
    break;
  case '-':
    restar(valor1, valor2);
    break;
  case '*':
    multiplicar(valor1, valor2);
    break;
  case '/':
    dividir(valor1, valor2);
    break;
  default:

}
