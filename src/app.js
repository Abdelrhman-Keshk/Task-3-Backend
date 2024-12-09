const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient

const connectionUrl = "mongodb://127.0.0.1:27017"

const dbName = "Task-3"

mongoClient.connect(connectionUrl, (error, client) => {
    if (error) {
        return console.log(`ERROR : ${error}`)
    }
    console.log("Succesfully connnected to MongoDB")

    const db = client.db(dbName)
                db.collection("users").insertOne({
                    name: "Mohamed",
                    age: 27
                }, (error, user) => {
                    if (error) {
                        console.log("Unable to insert user")
                    }
                })
            
                db.collection("users").insertOne({
                    name: "Abdelrhman",
                    age: 27
                }, (error, user) => {
                    if (error) {
                        console.log("Unable to insert user")
                    }
                })
            
                db.collection("users").insertMany([
                    {
                        name: "Omar",
                        age: 27
                    },
                    {
                        name: "Ahmed",
                        age: 27
                    },
                    {
                        name: "Osama",
                        age: 27
                    },
                    {
                        name: "Adel",
                        age: 22
                    },
                    {
                        name: "Mazen",
                        age: 24
                    },
                    {
                        name: "Mostafa",
                        age: 22
                    },
                    {
                        name: "Akram",
                        age: 25
                    },
                    {
                        name: "Yousef",
                        age: 26
                    },
                    {
                        name: "Kareem",
                        age: 28
                    },
                    {
                        name: "Ramy",
                        age: 23
                    }
                ], (error, users) => {
                    if (error) {
                        console.log("Unable to insert users")
                    }

                    db.collection("users").find({ age: 27 }).toArray((error, users) => {
                        if (error) {
                            return console.log("Unable to find users")
                        }
                        console.log("Users with age 27:", users);
        
                        db.collection("users").find({ age: 27 }).limit(3).toArray((error, users) => {
                            if (error) {
                                return console.log("Unable to find users")
                            }
                            console.log("First 3 users with age 27:", users);
                            updateOneByIndex(0, {
                                $set: { name: "Mahmoud" },
                                $inc: { age: 4 }
                            },() => {
                                updateOneByIndex(1, {
                                    $set: { name: "Abdallah" },
                                    $inc: { age: 4 }
                                },() => {
                                    updateOneByIndex(2, {
                                        $set: { name: "Amr" },
                                        $inc: { age: 4 }
                                    },() => {
                                        updateOneByIndex(3, {
                                            $set: { name: "Hamed" },
                                            $inc: { age: 4 }
                                        },() => {           
                                            db.collection("users").updateMany({}, {
                                                $inc: {age: 10}
                                            },(error, data) => {
                                                if (error) {
                                                    return console.log(error)
                                                }
                                                console.log(`Sucessfully updated ${data.modifiedCount} user`)

                                                db.collection("users").deleteMany({age: 41})
                                                .then((data) => {console.log(`Sucessfully deleted ${data.deletedCount} users with age 41`)})
                                                .catch((error) => console.log(error))
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
        
                const updateOneByIndex = (index, update, callback) => {
                    db.collection("users").find({}).toArray((error, users) => {
                        if (error) {
                            return console.log("Unable to find users")
                        }
                        db.collection("users").updateOne({ _id: mongodb.ObjectId(users[index]._id) }, update, callback)
                    })
                }
        }
)

