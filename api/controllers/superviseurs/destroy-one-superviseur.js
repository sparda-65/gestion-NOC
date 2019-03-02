module.exports = {


  friendlyName: 'Destroy one superviseur',


  description: ' Supprimer un supervisuer avec l\'id en argument de la DB',


  inputs: {
    id:{
      type:'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var sup =await Superviseur.findOne({
      id:inputs.id
    });
    await Superviseur.destroy({id:inputs.id});

    sails.log(sup.imageUploadFd);

    var fs = require('fs');

    var filePath = sup.imageUploadFd;

    fs.unlink(filePath, (err) => {
      if (err) {throw err;}
      console.log(filePath+' was deleted');
    });

    return exits.success();

  }


};
