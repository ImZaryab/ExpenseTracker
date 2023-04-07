const model = require("../models/model");

//get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});

  //return filtered data
  let filteredResults = await data.map((item) =>
    Object.assign({}, { type: item.type, color: item.color })
  );
  return res.json(filteredResults);

  //return all data from mongodb collection
  //return res.json(data);
}

//create categories data is static, needs to be changed
//post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Expense",
    color: "#46C2CB",
  });

  await Create.save()
    .then(function (create) {
      return res.status(200).json({ message: `${create}` });
    })
    .catch(function (err) {
      if (err)
        return res
          .status(400)
          .json({ message: `Error while creating categories ${err}` });
    });
}

//get: http://localhost:8080/api/transaction
async function get_Transactions(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//post: http://localhost:8080/api/transaction
async function create_Transactions(req, res) {
  if (!req.body)
  {
    return res.status(400).json("Post HTTP data no found")
  }
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  create
    .save()
    .then(function (create) {
      return res.status(200).json({ message: `${create}` });
    })
    .catch(function (err) {
      if (err)
        return res
          .status(400)
          .json({ message: `Error while creating transaction ${err}` });
    });
}

//delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "No Request Body Found!" });

  await model.Transaction.deleteOne(req.body)
    .then(function (err){
      if (err.deletedCount == 1){
        res.json("Record Deleted!")
      } else {
        res.json("Nothing found ")
      }
    })
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}

//Join 2 documents
//lookup allows to find a specific key in a document.
//define the local key u wanna find and forein key common in both documents.
//get: http://localhost:8080/api/labels
async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
      //deconstructs the array from input document to output a document for each element
    },
  ])
    .then((result) => {
        //map only required values onto a data object and return that as response
      let data = result.map((item) =>
        Object.assign(
          {},
          {
            _id: item._id,
            name: item.name,
            type: item.type,
            amount: item.amount,
            color: item.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Lookup Collection Error");
    });
}

module.exports = {
  get_Categories,
  create_Categories,
  get_Transactions,
  create_Transactions,
  delete_Transaction,
  get_Labels,
};
