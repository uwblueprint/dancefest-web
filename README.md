# Dancefest Admin

## Setup

```
$ git clone https://github.com/uwblueprint/dancefest-web.git
$ cd dancefest-web
$ npm install
```

### Firebase/Firestore setup

Ask a Dancefest member for firebase credentials and
create a `.env` file with key names below:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_UR
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
```

### Running

`$ npm run start`

Sometimes the `npm` packages and versioning gets messed up.
If you find yourself stuck when trying to run the app, try:

`$ rm -rd node_modules; npm i`
