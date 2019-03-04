module.exports = {


  friendlyName: 'Add one acce',


  description: '',


  inputs: {
    acce: {type: 'string'},
  },


  exits: {

    noRessource: {
      description: 'empty ressource .',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {
    console.log('add one Acce: '+inputs.acce);

    if(!inputs.acce) {
      throw 'noAcce';
    }

    var acce = await Acces.create({
      acce: inputs.acce,
    }).fetch();

    return exits.success({
      id: acce.id,
    });


  }


};
