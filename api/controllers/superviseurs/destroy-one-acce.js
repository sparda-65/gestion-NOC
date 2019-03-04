module.exports = {


  friendlyName: 'Destroy one acce',


  description: 'Supprimer un acce avec l\'id en argument de la DB',


  inputs: {
    id:{
      type:'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('destroy One Ressource');
    await Acces.destroy({id:inputs.id});
    return exits.success();

  }


};
