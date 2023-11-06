const Book = require('../models/book.model');

exports.create = (req,res)=>{
    if(!req.body.title){
        return res.status(400).send("book title can not be empty");
    }
    else{
        const book = {
        title : req.body.title,
        author : req.body.author,
        summary : req.body.summary
        }
        new Book(book).save((error,result)=>{
            if(error){
                console.log("Internal Server Error", error);
                return res.status(500).send("server error");
            }
            else{
                console.log("Sucessfully Created", result);
                return res.status(200).send(result);
            }
        })
    }

};

exports.findAll = (req,res)=>{
    Book.find()
    .then((data)=>{

        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(404).send(err);
    })
};

exports.findOne = (req,res)=>{
    Book.findById(req.params.bookId)
    .then((data)=>{
        return res.status(200).send(data);
    }).catch((err)=>{
        return res.status(404).send(err);
    })
}

exports.update = (req,res)=>{
    Book.findByIdAndUpdate(req.params.bookId,{
        $set:{
            email : req.body.email
        }
    })
    .then((data)=>{
        return res.status(202).send(data);
        console.log(data);
    }).catch((err)=>{
        return res.status(403).send(err);
        console.log(err);
    })
}

exports.delete = (req,res)=>{
    Student.findByIdAndRemove({_id: req.params.studentId})
    .then(()=>{
        return res.status(204).send("Deleted Succesfully");
    }).catch((err)=>{
        return res.status(404).send(err);
    })
};