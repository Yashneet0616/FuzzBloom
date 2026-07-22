const { db } = require('./config/firebaseAdmin')

async function test() {
  try {
    const collections = await db.listCollections()

    console.log('✅ Connected successfully!')
    console.log(collections.map((c) => c.id))
  } catch (err) {
    console.error(err)
  }
}

test()