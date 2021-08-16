# Redactie boilerplate module (React)

## How to start?

### Init repository

Copy this repository and replace references to "redactie-boilerplate" in package.json

### Install all dependencies

```
npm install && cd demo && npm install
```

### Build the library

```
// from root
npm run build
// or
npm run build:w
// To watch the file
```

### Start the demo app

```
cd demo && npm run start
```

## Deploy
### Publish library to package registry

```
npm login --scope=@redactie --registry=https://nexusrepo.antwerpen.be/repository/npm-all
npm publish
```

### WCM config

* add module/version to list of modules
* enable module/version in tenant