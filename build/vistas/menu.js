"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuTriangulo = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menuTriangulo = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Crear Triángulo');
    console.log('2.- Área');
    console.log('3.- Perímetro');
    console.log('4.- Cambiar altura');
    console.log('5.- Salvar en BD');
    console.log('6.- Cargar Triángulo de la BD');
    console.log('7.- Modificar Triángulo de la BD');
    console.log('8.- Borrar Triángulo de la BD');
    console.log('9.- Mostrar Triángulo');
    console.log('10.- Listar superficies de triángulos');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
