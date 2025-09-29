module.exports = {
  async returnIndex(req, res) {
    console.log("123");

    res.render("../views/index.ejs");
  },
};
