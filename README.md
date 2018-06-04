<img src="https://i.imgur.com/hvj4iMi.png" />


# RAM - AngularFrontend

This [Angular CLI](https://github.com/angular/angular-cli) (version 1.7.3.) project serves as the administration panel for the RAM - suite. This application does NOT work on its own.

Other applications in the RAM Application suite:
* [ARMonitoring](https://github.com/FinalworkDigX/ARMonitoringApp): Which is the iOS app that displays all info in Augmented Reality.
* [AngularFrontend](https://github.com/FinalworkDigX/AngularFrontend): serves as the administration panel for this whole suite.

## Setup
### Requirements
1. [SpringbootManager](https://github.com/FinalworkDigX/SpringbootManager) installed and working.
2. [Angular cli](https://github.com/angular/angular-cli#installation) installed and working. (For ng commands)


## Development server
### Common setup
enviroenment file
if same serrver only slug to api
else whole url

### Backend and Angular on SAME server
This can be useful to only use slugs instead of full URLs in the code. <br/>
For this to work we need to tell Angular to proxy our requests.

##### Copy and edit the example.proxy.conf.json 

```bash
cp example.proxy.conf.json proxy.conf.json
```
##### Needed information <br/>
This is an example of how the `proxy.conf.json` file should look.
```bash
  "/api/*": {
    "target": "https://myApi.com",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
  }
```

##### To start the development server:
```bash
npm start
``` 

Navigate to `http://localhost:4200/` to inspect the application.<br/> 
The app will automatically reload if you change any of the source files.

### Backend and Angular on DIFFERENT server
For a development server run:
```bash
ng serve
``` 

Navigate to `http://localhost:4200/` to inspect the application.<br/> 
The app will automatically reload if you change any of the source files.


## Build

To build run next command. The project will be buikd in the `dist/` directory.
```bash
ng build --prod
```

### Angular  help

To get more help on the Angular CLI go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
