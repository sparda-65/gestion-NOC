module.exports = {


  friendlyName: 'Destroy one ressource',


  description: 'Supprimer une ressource avec l\'id en argument de la DB',


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
    await Ressources.destroy({id:inputs.id});
    return exits.success();

  }


};
