module.exports = {


  friendlyName: 'Destroy one equipe',


  description: 'Supprimer un equipe avec l\'id en argument de la DB',


  inputs: {
    id:{
      type:'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log('destroy One Equipes');
    await Equipes.destroy({id:inputs.id});
    return exits.success();

  }


};
