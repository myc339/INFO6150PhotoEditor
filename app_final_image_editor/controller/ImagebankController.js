const ImageBank = require("../models/Imagebank");
exports.listAllImage = (req, res) => {
    ImageBank.find({}, (err, img) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(img);
    });
  };

  exports.AddNewImage = (req, res) => {
    console.log(req.body.img);
    let image = new ImageBank();
    image.img=req.body.img;
    // image.title=req.body.title;
    // image.description=req.body.description;
    // image.provider=req.body.provider;
    // image.img.data=req.body.ImageData;
    // image.img.contentType=req.body.contentType;
    
    image.save((err, img) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json(img);
    });
  };