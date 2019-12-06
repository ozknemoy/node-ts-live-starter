import 'moment'
import moment = require("moment");

export class TimestampToDateOracleTransformer {
    /**
     * Used to marshal data when writing to the database.
     */
    to(value: number): any {
        return moment(value).format()
    }
    /**
     * Used to unmarshal data when reading from the database.
     */
    from(value: string): any{
        return moment(value).valueOf()
    }
}
