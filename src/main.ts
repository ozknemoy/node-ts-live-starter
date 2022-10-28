// not-strict-null-check
import { NULL } from './strict-null-check-lib';
import { ID_NULLABLE } from './not-strict-null-check-lib';
import { ID_NULLABLE_FROM_STRICT_LIB } from './strict-null-check-lib/index-not-strict-null-check';

let id: number = null;
const nul: number = NULL;
const idNullable: number = ID_NULLABLE;

console.log(id, nul, idNullable, ID_NULLABLE_FROM_STRICT_LIB);
