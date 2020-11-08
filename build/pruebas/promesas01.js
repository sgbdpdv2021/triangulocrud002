"use strict";
// https://medium.com/jspoint/typescript-promises-and-async-await-b842b55ee3fd
// Devuelve un número entero entre 0 y 9
const getEnteroAleatorio = () => {
    return Math.round((Math.random() * 10));
};
// resuelto con un entero par
const encuentraPar = new Promise((resuelto, rechazado) => {
    setTimeout(() => {
        const value = getEnteroAleatorio();
        if (value % 2 === 0) {
            resuelto(value);
        }
        else {
            rechazado('Es impar');
        }
    }, 1000);
});
// listen to promise resolution
encuentraPar.then((value) => {
    console.log('resuelto:', value);
}).catch((error) => {
    console.log('rechazado:', error);
}).finally(() => {
    console.log('Completado!');
});
