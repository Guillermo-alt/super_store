# Tienda virtual Tecla
Authors: Alejandro Esquivel / Guillermo Ortega

# Usage
* Clone Repo `git clone https://github.com/Jose-Alejandro/tienda-virtual.git`

# Setup MS Sql server
* setup username and password
* create an empty database e.g.
``` my_store ```
* save these to a .env file, as next described

# Set up your .env file with environmental variables
*  setup ``` HOST ```, ```PORT```, ```DB_USER```, ```DB_PASS```, ``` DB_NAME ```, ``` DIALECT ```, ``` SECRET_KEY ```, ``` WHITE_LIST ``` environmental variables
* example of .env file:

```
HOST= 'localhost'
PORT = 8080

DB_USER = 'user'
DB_PASS = 'pass'
DB_NAME = 'my_store'
DIALECT = 'mssql'

SECRET_KEY = 'MySecretKey.'

WHITE_LIST = ['http://127.0.0.1:8080', 'http://127.0.0.1:3000']
```

# Start Back and front server
* execute `npm install`
* execute `npm run dev`
* Go to a web browser and navigate to ```http://$HOST:$PORT```
* Start having fun with virtual store
