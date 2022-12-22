var express = require("express");
var router = express.Router();
const db = require("../database/users");

require("../models/connection");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const User = require("../models/users");
const Booking = require("../models/booking");
const Dog = require("../models/dogs");
const bcrypt = require("bcrypt");

// Création de la DB dans Mongoose

router.post("/all", (req, res) => {
 db.map(async(data) => {

      const hash = bcrypt.hashSync(data.password, 10);
      const newUser = new User({
        code_creche: data.code_creche,
        nom: data.nom,
        prenom: data.prenom,
        chien: data.chien,
        date_de_naissance: data.date_de_naissance,
        telephone: data.telephone,
        email: data.email,
        password: hash,
        rue: data.rue,
        code_postal:data.code_postal,
        ville: data.ville,
        profession: data.profession,
        nom_contact_urgence: data.nom_contact_urgence,
        tel_contact_urgence: data.tel_contact_urgence,
        token: uid2(32),
      });

        let userSaved = await newUser.save()
          
        })
        res.json({result : true}),
      newUser.save().then(() => {
        res.json({ result: true, token: newUser.token });
      });
      
      // } else {
      //     User already exists in database
      //     res.json({ result: false, error: "User already exists" });
      //   }
});
  
// //ajout d'une route Toutou
// const newDog = new Dog({
//   name: req.body.name,
//   surnoms: req.body.surnom,
//   date_de_naissanceDog: req.body.date_de_naissanceDog,
//   genre: req.body.genre,
//   race: req.body.race,
//   Sterilisation: req.body.Sterilisation,
//   sante: req.body.sante,
//   caractere: req.body.caractere,
//   mesententes_chiens: req.body.mesententes_chiens,
//   entente_chats: req.body.entente_chats,
//   entente_enfants: req.body.entente_enfanst,
//   habitudes: req.body.habitudes,
//   peurs: req.body.peurs,
//   _idUser: newUser._id,
// });
// newDog.save().then(() => {
//   res.json({ result: true, token: newDog.token });
// });
// router.post("/signup", (req, res) => {
//   if (!checkBody(req.body, ["email", "password"])) {
//     res.json({ result: false, error: "Missing or empty fields" });
//     return;
//   }

//   // Check if the user has not already been registered
//   User.findOne({ email: req.body.email }).then((data) => {
//     if (data === null) {

//       });

//       newUser.save().then((newDoc) => {
//         res.json({ result: true, token: newDoc.token });
//       });
//     } else {
//       // User already exists in database
//       res.json({ result: false, error: "User already exists" });
//     }
//   });
// });

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password", "codeCreche"])) {
    res.json({ result: false, error: "Veuillez remplir tous les champs" });
    return;
  }
  User.findOne({ email: req.body.email }).then((data) => {
    if (
      data &&
      bcrypt.compareSync(req.body.password, data.password) &&
      req.body.codeCreche == "1234"
    ) {
      res.json({ result: true, data });
    } else {
      res.json({
        result: false,
        error:
        "L'utilisateur n'a pas été trouvé ou mauvais mot de passe (code crèche inclus)",
      });
    }
  });
});

router.get("/all", (req, res) => {
  User.find({}).then((data) => {
    console.log(data)
    if (data) {
      res.json({
        data: data,
      });
    }
  });
});





router.get("/all/:email", (req, res) => {
  User.findOne({

    email: { $regex: new RegExp(req.params.email, "i") },
  }).then(data => {
    if (data) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.put("/modify/:email", (req, res) => {
  User.updateOne(
    {email: { $regex: new RegExp(req.params.email, "i") }},
    {$set:{
      nom: req.body.nom,
      prenom: req.body.prenom,
      chien: req.body.chien,
      date_de_naissance: req.body.date_de_naissance,
      telephone: req.body.telephone,
      rue: req.body.rue,
      code_postal: req.body.code_postal,
      ville: req.body.ville,
      profession: req.body.profession,
      nom_contact_urgence: req.body.nom_contact_urgence,
      tel_contact_urgence: req.body.tel_contact_urgence,
    }}
  ).then(() => {
    res.json({ result: true });
  })
})

/*router.delete("/delete/:idUser/:date/:idDog", (req, res) => {
  Booking.deleteOne({
    user: req.params.idUser,
    date: req.params.date,
    dog: req.params.idDog,
  }).then((data) => {
    if (data) {
      res.json({ data: data, result: true });
    }
  });
}); */
/*router.get("/code_creche/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, codeCreche: data.codeCreche });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});*/

//faire une route qui permet de poster sur la base de donnée le fichier json et modifier les


//ro
//add booking to user
router.post("/add/:token/", (req, res) => {
  //check if user already have a booking for this date
  Booking.findOne({ userToken: req.params.token, date: req.body.date }).then(
    (data) => {
      console.log(data);
      if (data === null) {
        const newBooking = new Booking({
          date: req.body.date,
          heureDeDepose: req.body.heureDeDepose,
          heureDeRecuperation: req.body.heureDeRecuperation,
          commentaire: req.body.commentaire,
          userToken: req.params.token,
          // idDog: req.params.idDog,
        });

        newBooking.save().then(() => {
          res.json({ result: true });
        });
      } else {
        res.json({
          result: false,
          message: "Vous avez déjà une réservation pour cette date",
        });
      }
    }
  );
});

router.put("/dataBooking/:token/:date", (req, res) => {
  Booking.findOneAndUpdate(
    { userToken: req.params.token, date: req.params.date },
    {
      heureDeDepose: req.body.heureDeDepose,
      heureDeRecuperation: req.body.heureDeRecuperation,
      commentaire: req.body.commentaire,
    }
  ).then((data) => {
    res.json({ result: true });
  });
});


router.get("/booking/info/:token/:date", (req, res) => {
  Booking.findOne({ idToken: req.params.token, date: req.params.date }).then(
    (data) => {


      if(data === null) {
        res.json({ result: false, message: "Vous n'avez pas de réservation pour cette date" });
      }else{
      
      res.json({ result: true, data: data });
      }
    }
  );
});
/*

router.post("/add/:idUser/:idDog", (req, res) => {
  //check if user already have a booking for this date
  Booking.findOne({ user: req.params.idUser, date: req.body.date }).then(
    (data) => {
      if (data === null) {
        const newBooking = new Booking({
          date: req.body.date,
          heureDeDepose: req.body.heureDeDepose,
          heureDeRecuperation: req.body.heureDeRecuperation,
          commentaire: req.body.commentaire,
          idUser: req.params.idUser,
          idDog: req.params.idDog,
        });

        newBooking.save().then(() => {
          res.json({ result: true });
        });
      } else {
        res.json({
          result: false,
          message: "Vous avez déjà une réservation pour cette date",
        });
      }
    }
  );
});

*/

router.get("/allBookingPerUser/:token", (req, res) => {
  Booking.find({ userToken: req.params.token }).then((data) => {
    if (data) {
      res.json({ data: data });
    }
  });
});

//route qui permet d'afficher que les dates de réservation

router.get("/allBookingDuplicate", (req, res) => {
  Booking.find({}).then((data) => {
    if (data) {
      res.json({ data: data });
    } else {
      res.json({ error: "no data" });
    }
  });
});

//count how many booking for a date
router.get("/count/:date", (req, res) => {
  Booking.countDocuments({ date: req.params.date }).then((data) => {
    if (data) {
      res.json({ data: data });
    } else {
      res.json({ data: 0 });
    }
  });
});

// router.get("/allDogPerUser/:idUser", (req, res) => {
//   Dog.find({ _idUser: req.params.idUser }).then((data) => {
//     if (data) {
//       res.json({ data: data });
//     }
//   });
// });



router.get("/all/:email", (req, res) => {
  User.findOne({
    email: { $regex: new RegExp(req.params.email, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});


// router.post("/signin", (req, res) => {
//   if (!checkBody(req.body, ["email", "password"])) {
//     res.json({ result: false, error: "Missing or empty fields" });
//     return;
//   }
//   User.findOne({ email: req.body.email }).then((data) => {
//     if (data && bcrypt.compareSync(req.body.password, data.password)) {
//       //if (data && req.body.password == data.password) {
//       res.json({ result: true, data });
//     } else {
//       res.json({ result: false, error: "User not found or wrong password" });
//     }
//   });
// });
// router.post("/signin", (req, res) => {
//   if (!checkBody(req.body, ["email", "password"])) {
//     res.json({ result: false, error: "Missing or empty fields" });
//     return;
//   }
//   User.findOne({ email: req.body.email }).then((data) => {
//     if (data && bcrypt.compareSync(req.body.password, data.password)) {
//       //if (data && req.body.password == data.password) {
//       res.json({ result: true ,data});
//     } else {
//       res.json({ result: false, error: "User not found or wrong password" });
//     }
//   });
// });



router.get("/booking/:idUser", (req, res) => {
  console.log(req.params.idUser);
  Booking.find({ idUser: req.params.idUser }).then((data) => {
    if (data) {
      res.json({ data: data });
    }
  });
});

//router supprimer booking par id et date
router.delete("/delete/:idUser/:date/", (req, res) => {
  Booking.deleteOne({
    user: req.params.idUser,
    date: req.params.date,
    // dog: req.params.idDog,
  }).then((data) => {
    if (data) {
      res.json({ data: data, result: true });
    }
  });
});

/*router.delete("/delete/:idUser/:date/:idDog", (req, res) => {
  Booking.deleteOne({
    user: req.params.idUser,
    date: req.params.date,
    dog: req.params.idDog,
  }).then((data) => {
    if (data) {
      res.json({ data: data, result: true });
    }
  });
}); */
/*router.get("/code_creche/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, codeCreche: data.codeCreche });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});*/

//faire une route qui permet de poster sur la base de donnée le fichier json et modifier les

module.exports = router;
