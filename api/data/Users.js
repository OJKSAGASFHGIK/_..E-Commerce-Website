const bcrypt = require("bcryptjs")

const users = [
    {
        name: "Admin",
        email: "admin@node.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
]