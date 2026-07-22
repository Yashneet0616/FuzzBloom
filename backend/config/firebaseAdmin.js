const {
  initializeApp,
  cert,
} = require('firebase-admin/app')

const {
  getFirestore,
} = require('firebase-admin/firestore')

const {
  getAuth,
} = require('firebase-admin/auth')

const serviceAccount = require('./firebase-service-account.json')

const app = initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore(app)
const auth = getAuth(app)

module.exports = {
  app,
  db,
  auth,
}