# SHOP 2ème partie

- ajouter une barre de recherche de produit dans le header
- le contenu du bouton de soumission sera une icône font-awesome

- créer la page qui va afficher le résultat de la recherche
- créer la page qui va afficher le détail d'un produit

## Nouveautés

### récupérer un paramètre dynamique pour afficher le produit

Route
```js
app.get("/produit/:id" , (req,res) => {});
```
`:id` étant le paramètre dynamique (slug)
ce paramètre est disponible dans l'objet -> `req.params`

transmettre l'`id` sur le lien de l'élément coté `.ejs`


### input de recherche

- coté serveur pour récupérer les données d'un formulaire il faut activer le module sous forme de middleware
- ce qui les rendra disponible dans l'objet -> `req.body`
```js
app.use(express.urlencoded({extended: true}));
```

fichier ejs, dans le header
```html
<form action="/search" method="POST">
```
A la soumission du formulaire, on envoi des données :
- ça sera une méthode `POST`
- et on va orienté notre "router" sur la route "/search (l'action)

Dans la callback request handler `(req, res)` de cette route `POST`:
effectuer une redirection pour former une requête `GET` avec les paramètres suivants et la query :
```js
    `/search?search=${req.body.search}` 
```

Récupérer cette query dans la route search, dans l'objet `req.query`
- effectuer l'algo' de recherche entre vos données de fichier JSON et cette query, puis envoyer les résultats (render)