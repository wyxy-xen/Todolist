# Todolist

# Présentation générale

Le projet consiste  à réaliser une application pour gérer les tâches et les projets, à la manière d’une "todolist". 

# Outils de Développement

## Partie back-end
[Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Sequelize](https://sequelize.org/), [MySQL](https://www.mysql.com/).

## Partie Front-end
[Angular 9](https://angular.io/), [chart.js](https://visjs.org/).

# Lancement de Todolist sur le navigateur

Commencez par le clonage du projet en utilisant HTTPS:
```
https://github.com/m2cci-AJI/Todolist.git

```
Cette application comporte principalement deux sous-dossiers: Frontend et Backend, avec leurs propres fichiers de configuration package.json. Tout d'abord, il faut exécuter la commande suivante dans deux terminaux différents pointés sur les dossiers Frontend et Backend:
```bash
npm install

```
Cette commande permet d'installer toutes les dépendances définits dans leurs fichiers de configuration package.json, en créant les dossiers node_modules correspondants.

Afin de lancer l'application angular localement sur votre serveur sur le port 4200, vous devez vous localiser sur le dossier Frontend et lancez la commande suivante sur le terminal:
```bash
npm run start
```
Cette commande exécute le script `start` définit dans le fichier package.json, comme suit:

```
  "scripts": {
    "start": "ng serve"
  }
```
Afin de lancer le serveur express sur le navigateur sur le port 4000, vous devez vous positionner sur le dossier Backend et exécuter la commande suivante:

```bash
npm run dev
```

Cette commande exécute le script `dev` définit dans le fichier package.json, comme suit:

```
  "scripts": {
    "dev": "node server.js"
  }
```
# Nettoyage du projet de Todolist

Vous êtes invité à exécuter tout simplement la commande suivante:
```bash
npm run clean

```
Cette commande exécute le script `clean` qui est définit dans les fichiers package.json des parties Backend et Frontend, comme suit:

```
  "scripts": {
    "clean": "rm -rf node_modules"
  }
```
---

# Exécution des tests unitaires
Afin de valider notre travail de développement, la commande suivante est utilisée pour exécuter des tests unitaires que ce soient pour la partie front-end ou back-end:

```
npm run test
```

---

# Workflow adopté
Comme un système de gestion des branches, ce projet adopte le workflow master-only. 

# Analyse de qualité du code
Afin d'analyser la qualité de notre code, et détecter les bugs et les vulnérabilités, vous pouvez exécuter la commande suivante:

```
npm run sonar
```
Cette commande exécute le script `sonar` qui est définit dans le fichier package.json à la racine du notre code:

```
  "scripts": {
    "sonar": "sonar-scanner"
  }
```