// Definicion de variables

let vp = document.getElementById("pequeVilla");
let papel = vp.getContext("2d");

let fondo = {
    url: "tile.png",
    cargaOK: false
};

let vaca = {
    url: "vaca.png",
    cargaOK: false
};

let cerdo = {
    url: "cerdo.png",
    cargaOK: false
};

let pollo = {
    url: "pollo.png",
    cargaOK: false
};


let teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

let cantidad = aleatorio(2, 6);
let posicion = new Array(cantidad * 3 + 1);
let movimiento = 70;


// Cargar en memoria las imagenes

fondo.imagen     = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

vaca.imagen     = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargarVacas);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdos);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargarPollos);


document.addEventListener("keyup", dibujarTeclado);

inicializarPosicion(posicion);

function cargarFondo()
{
    fondo.cargaOK = true;
    dibujar();
}

function cargarVacas()
{
    vaca.cargaOK = true;
    dibujar();
}

function cargarCerdos()
{
    cerdo.cargaOK = true;
    dibujar();
}

function cargarPollos()
{
    pollo.cargaOK = true;
    dibujar();
}

function dibujar()
{
    let indice = 1;
    if(fondo.cargaOK)
    {
        papel.drawImage(fondo.imagen, 0, 0);
    }

    if(vaca.cargaOK)
    {
        for (let i = 0; i < cantidad; i++) {
            papel.drawImage(vaca.imagen, posicion[indice].x, posicion[indice].y);
            indice++;
        }
    }

    if(pollo.cargaOK)
    {
        for (let i = 0; i < cantidad; i++) {
            papel.drawImage(pollo.imagen, posicion[indice].x, posicion[indice].y);
            indice++;
        }
    }

    if(cerdo.cargaOK)
    {
        papel.drawImage(cerdo.imagen, posicion[0].x, posicion[0].y);
    }
}

function dibujarTeclado(event)
{
    switch(event.keyCode)
    {
        case teclas.UP:
            posicion[0].y -= movimiento;
        break;
        case teclas.DOWN:
            posicion[0].y += movimiento;
        break;
        case teclas.LEFT:
            posicion[0].x -= movimiento;
        break;
        case teclas.RIGHT:
            posicion[0].x += movimiento;
        break;
    }
    dibujar();
}

function inicializarPosicion(posicion)
{
    _inicializarPosicion(posicion);
}

function _inicializarPosicion(posicion)
{
    let indice = 0;
    while(indice < posicion.length)
    {
        let pos = {
            x: aleatorio(0,5),
            y: aleatorio(0,5)
        };
        pos.x *= movimiento;
        pos.y *= movimiento;

        if(_validarEspacioVacio(posicion, indice, pos))
        {
            posicion[indice] = pos;
            indice++;
        }
    }
}

function _validarEspacioVacio(posicion, indice, pos)
{
    for (let i = 0; i < indice; i++) {
        if(posicion[i].x == pos.x && posicion[i].y == pos.y)
        {
            return false;
        }
    }
    return true;
}

function aleatorio(mini, maxi)
{
    let resultado;
    resultado = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
    return resultado;
}
