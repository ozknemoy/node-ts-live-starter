// not-strict-null-check
import { NULL } from './strict-null-check-lib';
import { ID_NULLABLE } from './not-strict-null-check-lib';

let id: number = null;
const nul: number = NULL;
const idNullable: number = ID_NULLABLE;

console.log(id, nul, idNullable);
