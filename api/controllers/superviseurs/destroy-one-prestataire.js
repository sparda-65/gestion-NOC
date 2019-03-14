module.exports = {


  friendlyName: 'Destroy one prestataire',


  description: 'Supprimer un Prestataires avec l\'id en argument de la DB',


  inputs: {
    id:{
      type:'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('destroy One Prestataires');
    await Prestataires.destroy({id:inputs.id});
    return exits.success();

  }


};
