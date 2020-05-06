db.createUser({
  user: 'linkApi',
  pwd: 'kapiTest',
  roles: [
    {
      role: 'readWrite',
      db: 'linkapi',
    },
  ],
})

db.createCollection('opportunitiesWon')
db.createCollection('users')
