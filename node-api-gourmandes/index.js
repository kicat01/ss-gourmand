const express = require('express')
const app = express()
const mysql = require('mysql');
const fs = require('fs')



// http://localhost:8081/produitsSQL
app.get('/produitsSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })
  
    // Connexion à la BD
    connexion.connect()
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM produits', (err, rows, fields) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })
  /////////////////////////////////usersInsert////////////////////////////////

// http://localhost:8081/usersInsertSQL?nom=..&prenom=..&pseudo=...&email=..&password=..
// Vers du MySQL (Insert)
app.get('/usersInsertSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })
  
    // Connexion à la BD
    connexion.connect()
    const params = [req.query.nom, req.query.prenom, req.query.pseudo, req.query.email, req.query.password]
    // Exécute une requête SQL de type INSERT
    connexion.query('INSERT INTO users(nom, prenom, pseudo, email, password) VALUES(?,?,?,?,?)', params, (err, affected) => {
      // SI OK
      if (!err) {
        console.log(affected)
        res.status(200).json(affected)
      }
      // Si KO
      else {
        console.log(affected)
        console.log("\nErreur d'exécution de la requête !" + err)
        let array = []
        array.push("Erreur d'exécution de la requête !" + err)
        res.status(200).json(array)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })
  ////////////////////////////////produitsInsert////////////////////////////////
// http://localhost:8081/produitsInsertSQL?nom_produit
// http://localhost:8081/produitsInsertSQL?nom_produit=..& id_auteur=...&id_type=..&preparation=..&etape_recette=..
// Vers du MySQL (Insert)
app.get('/produitsInsertSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })
  
    // Connexion à la BD
    connexion.connect()
    const params = [ req.query.nom_produit, 1, 1, req.query.preparation, req.query.etape_recette]
    // Exécute une requête SQL de type INSERT
    connexion.query('INSERT INTO produits(nom_produit, id_auteur, id_type, preparation, etape_recette) VALUES(?,?,?,?,?)',params, (err, affected) => {
      // SI OK
      if (!err) {
        console.log(affected)
        res.status(200).json(affected)
      }
      // Si KO
      else {
        console.log(affected)
        console.log("\nErreur d'exécution de la requête !" + err)
        let array = []
        array.push("Erreur d'exécution de la requête !" + err)
        res.status(200).json(array)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })
////////////////////////////oneproduitsSQL///////////////////////////////
// http://localhost:8081/produitsOneSQL?id_produit=...
// Vers du MySQL (SelectOne)
app.get('/produitsOneSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })

    // Connexion à la BD
    connexion.connect()

    const param = req.query.id_produit
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM produits WHERE id_produit = ?', param, (err, rows) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        // A REVOIR
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  
    //res.status(200).json(rows)
  }) /// app.get("/produitsOneSQL", ...
  
  ////////////////////////////onecategoriesSQL///////////////////////////////
// http://localhost:8081/produitsOneSQL?id_produit=...
// Vers du MySQL (SelectOne)
app.get('/categoriesOneSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })

    // Connexion à la BD
    connexion.connect()

    const param = req.query.id_categorie
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM categories WHERE id_categorie = ?', param, (err, rows) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        // A REVOIR
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
  
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  
    //res.status(200).json(rows)
  }) /// app.get("/produitsOneSQL", ...
  /////////////////////////////////////categoriesSQL////////////////////////////

  // http://localhost:8081/categoriesSQL
app.get('/categoriesSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })
  
    // Connexion à la BD
    connexion.connect()
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM categories', (err, rows, fields) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })

  ///////////////////////////////ingredients////////////////////////////////////
  // http://localhost:8081/ingredientsSQL
app.get('/ingredientsSQL', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Crée un objet de type Connection
  const connexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'gourmand_sans_complexes'
  })

  // Connexion à la BD
  connexion.connect()
  // Exécute une requête SQL de type SELECT
  connexion.query('SELECT * FROM ingredients', (err, rows, fields) => {
    // SI OK
    if (!err) {
      console.log(rows)
      res.status(200).json(rows)
    }
    // Si KO
    else {
      console.log("\nErreur d'exécution de la requête !" + err)
      res.status(200).json("\nErreur d'exécution de la requête !" + err)
    }
  })
  // Déconnexion de la BD
  connexion.end() /// Déconnexion
})
  
//////////////////////////////////typerecetteSQL//////////////////////////////
// http://localhost:8081/typerecetteSQL
app.get('/typerecetteSQL', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
    // Crée un objet de type Connection
    const connexion = mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'gourmand_sans_complexes'
    })
  
    // Connexion à la BD
    connexion.connect()
    // Exécute une requête SQL de type SELECT
    connexion.query('SELECT * FROM typerecette', (err, rows, fields) => {
      // SI OK
      if (!err) {
        console.log(rows)
        res.status(200).json(rows)
      }
      // Si KO
      else {
        console.log("\nErreur d'exécution de la requête !" + err)
        res.status(200).json("\nErreur d'exécution de la requête !" + err)
      }
    })
    // Déconnexion de la BD
    connexion.end() /// Déconnexion
  })
  //////////////////////////////////////////////////////////////////////////////
app.get('/', (req,res) => {
    res.send("Accueil")
})

app.listen(8081, () => {
  console.log("Serveur à l'écoute http://localhost:8081")
})
