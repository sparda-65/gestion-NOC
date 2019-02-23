module.exports = {


  friendlyName: 'Add one ressource',


  description: '',


  inputs: {

    ressource: {type: 'string'},

  },


  exits: {

    noRessource: {
      description: 'empty ressource .',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {

    console.log('add one ressource: '+inputs.ressource);

    if(!inputs.ressource) {
      throw 'noRessource';
    }

    var ressource = await Ressources.create({
      ressource: inputs.ressource,
    }).fetch();

    return exits.success({
      id: ressource.id,
    });

  }


};
