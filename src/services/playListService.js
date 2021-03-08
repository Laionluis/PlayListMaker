import { ItemPlayList } from '../models/itemPlayList'
import {DatabaseConnection} from '../database/DatabaseConnection'

const table = "PlayList"
const db=DatabaseConnection.getConnection()

export async function addData(param) {
    return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (idSpotify, title, artista, utlImagem) 
                values (?,?,?,?)`, 
                [param.idSpotify, param.title, param.artista, param.utlImagem], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
}

export async function findAll() {
    let playList = []; 
    return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {                
                let data = rows.length;           
                for (let i = 0; i < rows.length; i++) {   
                    playList.push(rows._array[i]);                   
                }
                resolve(playList);
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))       
}

export async function findByIdSpotify(idSpotify) {
    let playList = []; 
    return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where idSpotify = ?`, [idSpotify], (_, { rows }) => {                
                let data = rows.length;   
                resolve(data > 0);
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))       
}

export async function deleteData(idSpotify) {
    return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where idSpotify = ?`, 
                [idSpotify], 
                (_, results) => {
                    resolve(results.rowsAffected)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
}

export default {addData, findAll, findByIdSpotify, deleteData}

