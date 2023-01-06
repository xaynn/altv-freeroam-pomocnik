import * as alt from 'alt';
import * as chat from 'chat';
import mysql from 'mysql'
import dotenv from 'dotenv';
import colors from 'colors'
import sjcl from 'sjcl'

export var connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'p_accounts',
    connectionLimit: 2500
});




alt.log("[DATABASE] Succesfully connected to database!".green);


export default connection;
//jak kiedys wyjebie connectionlimit albo duzy bufor to sprawdzic jeszcze raz xD