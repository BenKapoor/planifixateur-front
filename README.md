<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">README</h3>

  <p align="center">
    Projet PLANIFIXATEUR
    <br />
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#fonctionnement">Fonctionnement</a>
      <ul>
        <li><a href="#toolbar">Toolbar</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][accueil-screenshot]]()

Application web utilisant un Web service REST : https://github.com/BenKapoor/planifixateur permettant de gérer ses projets.

### Built With

Cette partie liste les différentes technolohies utilisées lors du développement de cette application Front.
* [Angular Material](https://material.angular.io/)
* [Angular](https://angular.io)
* [TypeScript](https://www.typescriptlang.org/)


<!-- GETTING STARTED -->
## Getting Started

Instructions à suivre pour utiliser l'application.

### Prérequis

<b>Installer un serveur node</b>

Prendre la version LTS : <li><a href="https://nodejs.org/en/">Serveur Node</a></li>

Une fois le serveur installé, passer à la suite.

### Installation

0. Télécharger le .zip

1. Aller dans le dossier de reception voulu (ex: C:\projets_angular)

2. Décompresser le .zip

<!-- USAGE EXAMPLES -->
## Usage
Aller à la racine du projet :
 ```sh
  C:\...\planifixateur
  ```
Ouvrir la console CMD (invité de commande).

1. Démarrer le serveur :

  ```sh
  npm start
  ```
2. Sur le navigateur de votre choix :

  <li><a href="http://localhost:4200/">http://localhost:4200/</a></li>
  
## Fonctionnement

### Toolbar

* Liste des projets : Permets de lister tous les projets déjà créé et accépder à leurs fonctionnalitées 
  * *ajouter une ligne :* Permet de rajouter une ou plusieurs lignes à un projet existant
  * *Détail :* Permet de visualiser le détail du projet, les différentes lignes qui le compose, ses fichiers (télécharger, supprimer et ajouter), ainsi que différentes info 
  * *Modifier :* permet de modififier les infos existantes d'un projet
  * *Supprimer :* supprime le projet en selectionné

* Créer un Projet

Création d'un projet et des lignes.

* Gestion des fichiers

Permet de supprimer les fichiers définitivement. Lié au projet ou non.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[accueil-screenshot]: images/accueil.PNG

  
# Planifixateur

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
