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

    await Superviseur.destroy({id:inputs.id});

    return exits.success();

  }


};
