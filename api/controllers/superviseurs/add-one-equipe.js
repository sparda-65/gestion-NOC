module.exports = {


  friendlyName: 'Add one equipe',


  description: '',


  inputs: {
    equipe: {type: 'string'},
  },


  exits: {

    noRessource: {
      description: 'empty equipe .',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {
    console.log('add one Equipe: '+inputs.equipe);

    if(!inputs.equipe) {
      throw 'noEquipe';
    }

    var equipe = await Equipes.create({
      equipe: inputs.equipe,
    }).fetch();

    return exits.success({
      id: equipe.id,
    });


  }



};
