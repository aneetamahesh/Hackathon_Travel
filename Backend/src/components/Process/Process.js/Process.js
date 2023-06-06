const mysql=require('mysql');

const connection =mysql.createConnection({

    host:'136.226.243.76',

    port:3306,

    database:'DB4',

    user:'team4',

    password:'CN861H'

});

var database_connection_status='';

connection.connect(function(error){

    if(error)

    {

        database_connection_status='<h3 class ="text center text danger"> mysql connection error</h3>';

       

    }

    else

    {

        database_connection_status='<h3 class ="text center text success"> NodeJS connected to mysql</h3>';

    }

});