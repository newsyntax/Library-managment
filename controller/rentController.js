const RentModel = require("./../model/rent");

const rentBook = async (req, res) => {
  let reqBody = "";
  req.on("data", (data) => {
    reqBody = reqBody + data.toString();
  });

  req.on("end", async () => {
    const rentedBook = await RentModel.rentBook(reqBody);
    res.writeHead(201, { "content-type": "application/json" });
    res.write(JSON.stringify(rentedBook));
    res.end();
  });
};

module.exports = {
  rentBook,
};
