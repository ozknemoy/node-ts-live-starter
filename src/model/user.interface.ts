import {IUserRight} from "./user-right.interface";

export class IUser {
    id?: number;
    login: string;
    password: string;
    rights: IUserRight[];
    admin: boolean;
}


const ret = {
    repo:
        {
            manager:
                {
                    repositories: [Array],
                    plainObjectToEntityTransformer: {},
                    connection: []
                },
            metadata: {
                childEntityMetadatas: [],
                inheritanceTree: [Array],
                tableType: 'regular',
                withoutRowid: false,
                synchronize: true,
                hasNonNullableRelations: false,
                isJunction: false,
                isClosureJunction: false,
                hasMultiplePrimaryKeys: false,
                hasUUIDGeneratedColumns: false,
                ownColumns: [Array],
                columns: [Array],
                ancestorColumns: [],
                descendantColumns: [],
                nonVirtualColumns: [Array],
                ownerColumns: [],
                inverseColumns: [],
                generatedColumns: [],
                primaryColumns: [Array],
                ownRelations: [Array],
                relations: [Array],
                eagerRelations: [],
                lazyRelations: [],
                oneToOneRelations: [],
                ownerOneToOneRelations: [],
                oneToManyRelations: [Array],
                manyToOneRelations: [],
                manyToManyRelations: [],
                ownerManyToManyRelations: [],
                relationsWithJoinColumns: [],
                relationIds: [],
                relationCounts: [],
                foreignKeys: [],
                embeddeds: [],
                allEmbeddeds: [],
                ownIndices: [],
                indices: [],
                uniques: [],
                ownUniques: [],
                checks: [],
                exclusions: [],
                ownListeners: [Array],
                listeners: [Array],
                afterLoadListeners: [],
                beforeInsertListeners: [Array],
                afterInsertListeners: [],
                beforeUpdateListeners: [],
                afterUpdateListeners: [],
                beforeRemoveListeners: [],
                afterRemoveListeners: [],
                connection: [],
                inheritancePattern: undefined,
                treeType: undefined,
                parentClosureEntityMetadata: undefined,
                tableMetadataArgs: [Object],
                target: [],
                expression: undefined,
                engine: undefined,
                database: undefined,
                schema: undefined,
                givenTableName: 'a_user',
                targetName: 'User',
                tableNameWithoutPrefix: 'a_user',
                tableName: 'a_user',
                name: 'User',
                tablePath: 'a_user',
                schemaPath: undefined,
                orderBy: undefined,
                discriminatorValue: 'User',
                treeParentRelation: undefined,
                treeChildrenRelation: undefined,
                createDateColumn: undefined,
                updateDateColumn: undefined,
                versionColumn: undefined,
                discriminatorColumn: undefined,
                treeLevelColumn: undefined,
                nestedSetLeftColumn: undefined,
                nestedSetRightColumn: undefined,
                materializedPathColumn: undefined,
                objectIdColumn: undefined,
                propertiesMap: [Object]
            },
            queryRunner: undefined
        },
    login: 'nemoy',
    password:
        '$2b$10$9VatvoP1dfL6WbBKTCeq3evGyWlcHhbV8Ej3V8W7GZeGFgZsey866',
    admin: true,
    rights: null,
    id: 1
}
