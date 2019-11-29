import {connection} from "./db";


export class DiffNetsService {
  getDN() {
    return connection.query(`
  select
    ID, SELLER_ID, BUYER_ID,
    DOC_TYPE_ID, FIELD_ID, FIELD_CODE,
    FIELD_NAME, LOCATION_ID, LOCATION_CODE,
    IS_DISPLAY, IS_REQUIRE, VALUE_SIZE,
    ORDINAL, SELLER_NAME, BUYER_NAME, FIELD_CODE_VIEW, UI_GROUP, IS_XLS_READ_ONLY
  from (
         select
             s.ID, s.SELLER_ID, s.BUYER_ID,
             s.DOC_TYPE_ID, s.FIELD_ID, s.FIELD_CODE,
             s.FIELD_NAME, s.LOCATION_ID, s.LOCATION_CODE,
             s.IS_DISPLAY, s.IS_REQUIRE, s.VALUE_SIZE,
             s.ORDINAL, s.SELLER_NAME, s.BUYER_NAME, s.FIELD_CODE_VIEW, s.UI_GROUP, s.IS_XLS_READ_ONLY,
             Rank() over (Partition By s.Field_Id, s.Location_Id ORDER BY s.buyer_id desc nulls last, s.seller_id desc nulls last, s.ui_group desc nulls last) Priority
         from EDI_GUI_SBR.Dict_Sets_Ui_Sets_Vw s
         WHERE s.DOC_TYPE_ID = :DOC_TYPE_ID AND (s.SELLER_ID = :SELLER_ID OR s.SELLER_ID IS NULL) AND (s.BUYER_ID = :BUYER_ID OR s.BUYER_ID IS NULL) and (s.ui_group = :ui_group OR s.ui_group IS NULL)
     ) where Priority = 1
  `, [/*DOC_TYPE_ID*/1, /*SELLER_ID*/1, /*BUYER_ID*/1, /*ui_group*/6]).then(resp => {
      console.log(resp.length);

    });
  }
}