
export class BooleanOracleTransformer {
    /**
     * Used to marshal data when writing to the database.
     */
    to(value: boolean): any {
        // oracle сама преобразует в число и так не сломается поиск
        return value
    }
    /**
     * Used to unmarshal data when reading from the database.
     */
    from(value: number): any{
        return Boolean(value)
    }
}
