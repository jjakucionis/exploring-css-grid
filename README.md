# Writing code

For writing styles we will be using [BEM](http://getbem.com/introduction/) in [SCSS](https://sass-lang.com/).

For writing scripts we will be using [TypeScript](https://www.typescriptlang.org/) linted with [TSLint](https://palantir.github.io/tslint/) using [Airbnb JavaScript Style Guide](https://github.com/progre/tslint-config-airbnb).
It's recomended to use Prettier plugin on your code editor.

All the markup has to go in plain PHP code using pre-coded partials located in `partials`.

# Setup

## General

- Install and use whatever IDE that supports [EditorConfig](https://editorconfig.org) natively or as a plugin. IDEs are listed on the EditorConfig website.

## For PHP

- Install [MAMP](https://www.mamp.info) or alternative

## For JavaScript and SCSS

- Install [Node.js](https://nodejs.org) latest LTS version
- Run `npm i`

Note that if after running `npm i` you still cannot run `npm start` then run `npm install --only-dev` to make sure you installed `devDependencies`.

## GIT Repo

Setup git repo in [Bitbucket](https://bitbucket.org/) or [Github](https://github.com/)

# Start

1. Start MAMP
2. Run `npm start` in your CMD opened in your project
3. Open your project in `localhost`

# Version control

Don't worry about building before pushing to GIT. There is `pre-commit` script set up which builds TypeScript and SCSS to JavaScript and CSS and places it in `assets` folder. Then it's being staged and commited.

If you are not working alone - branch everything you do and leave merge/pull requests to solve for one person in your team.

When creating branches write semantic branch names like:

- `bug-ios-modal-scroll`
- `feature-your-mom`
- `refactor-em-to-px`

Also make relative commit messages instead of giberish. People will have to work with the same project after you. Probably.
