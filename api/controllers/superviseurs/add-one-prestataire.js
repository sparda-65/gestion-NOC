module.exports = {


  friendlyName: 'Add one prestataire',


  description: '',


  inputs: {
    prestataire: {type: 'string'},
  },


  exits: {

    noRessource: {
      description: 'empty prestataire .',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {
    console.log('add one prestataire: '+inputs.prestataire);

    if(!inputs.prestataire) {
      throw 'noPrestataire';
    }

    var prestataire = await Prestataires.create({
      prestataire: inputs.prestataire,
    }).fetch();

    return exits.success({
      id: prestataire.id,
    });


  }



};
