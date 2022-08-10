Get Started
```
npm i
npm start
```

Storage Rules Config:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; 
      allow write: if request.auth!=null;
    }
  }
}
```