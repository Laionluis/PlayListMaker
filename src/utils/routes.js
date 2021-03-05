import * as React from 'react';
import {serverMysql, senhaMysql} from '../../clientIds.js';

export async function TestarAcesso() 
{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host: serverMysql,
    user: 'laion',
    password: senhaMysql,
    database: 'PlaylistMaker'
    });
    connection.connect((err) => {
    if (err) throw err;
        console.log('Connected!');
    });
}

export default {TestarAcesso}