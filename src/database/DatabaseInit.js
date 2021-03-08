import { DatabaseConnection } from './DatabaseConnection'

var db = null
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection();
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        this.InitDb();
    }

    InitDb() {
        var sql = [
            `DROP TABLE IF EXISTS PlayList;`,

            `create table if not exists PlayList (
                id integer primary key autoincrement,
                idSpotify text,
                title text,
                artista text,
                utlImagem text    
            );`,
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}