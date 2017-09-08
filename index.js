require('@std/esm');
require('babel-register');
try {
    require('./src/server');
} catch (err) {
    console.error(err);
}
