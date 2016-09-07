var semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
var dia = prompt('ingresar dia');
var hoyEs = 'dia no valido';
for (i in semana) {
    if (dia === semana[i]) {
    	if (dia === 'domingo' || dia === 'sabado') {
    		hoyEs = 'fin de semana';
				break;
    	} else {
    		hoyEs = 'dia habil';
				break;
    	}
    }
}
alert(hoyEs);
