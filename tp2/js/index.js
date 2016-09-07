var semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
var dia = prompt('ingresar dia');
var hoyEs = 'dia no valido';
for (i in semana) {
    if (dia === semana[i]) {
    	if (dia != 'domingo' && dia != 'sabado') {
    		hoyEs = 'dia habil';
				break;
    	} else {
    		hoyEs = 'fin de semana';
				break;
    	}
    }
}
alert(hoyEs);
