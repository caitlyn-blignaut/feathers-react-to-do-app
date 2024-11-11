console.log("******************** Creating default users ********************");

db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_USER_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: "to-do-api",
    },
  ],
});

console.log("******************** Done ********************");
