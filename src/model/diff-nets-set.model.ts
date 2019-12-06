
export interface IBackFields {
  id?: number;
  sellerId?: number;
  buyerId?: number;
  documentTypeId: number;
  propId: number;
  name: string;
  locationId: number;
  display: boolean;
  required: boolean;
  maxLength?: number;
  ordinal: number;
  codeView?: string;
  group?: string;
  xlsReadOnly: boolean;


  // поля вьюшки бд
  propName?: string;
  sellerName?: string;
  buyerName?: string;
  location?: string;
}
