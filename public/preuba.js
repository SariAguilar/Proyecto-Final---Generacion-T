const bcrypt = require('bcrypt');  

const password = 'medias';  

bcrypt.hash(password, 10, (err, hash) => {  
    if (err) throw err;  
    console.log(hash); // Imprime el hash de "medias"  
});

console.log(path.join(__dirname, 'views', 'inicio-admin.html'));