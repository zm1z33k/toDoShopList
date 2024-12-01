const express = require("express")
const cors = require("cors")
const path = require('path')
const app = express()
const port = 8000

// Enable CORS
app.use(cors())

// Support for application/json
app.use(express.json())

// Support for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Importing the routes
const createListRouter = require(path.join(__dirname, 'dao/routes/createList'))
const archiveListRouter = require(path.join(__dirname, 'dao/routes/archiveList'))
const shareListRouter = require(path.join(__dirname, 'dao/routes/shareList'))
const addItemRouter = require(path.join(__dirname, 'dao/routes/addItem'))
const completeItemRouter = require(path.join(__dirname, 'dao/routes/completeItem'))
const deleteItemRouter = require(path.join(__dirname, 'dao/routes/deleteItem'))
const deleteListRouter = require(path.join(__dirname, 'dao/routes/deleteList'))
const viewListRouter = require(path.join(__dirname, 'dao/routes/viewList'))

// 1. Create list
app.use("/createList",createListRouter)

// 2. Archive list
app.use("/archiveList",archiveListRouter)

// 3. Share list
app.use("/shareList",shareListRouter)

// 4. Add item
app.use("/addItem",addItemRouter)

// 5. Complete item
app.use("/completeItem",completeItemRouter)

// 6. Delete item
app.use("/deleteItem",deleteItemRouter)

// 7. Delete list
app.use("/deleteList",deleteListRouter)

// 8. View list
app.use("/viewList",viewListRouter)

//App listening on port 8000
app.listen(port, () => {
  console.log('|\x1b[36m', `ToDoShopList app listening on port ${port}`, '\x1b[37m')
})