module.exports = {


  friendlyName: 'View available superviseurs',


  description: 'Display "Available superviseurs" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/superviseurs/available-superviseurs'
    }

  },


  fn: async function (inputs, exits) {
    var superviseurs= await Superviseur.find().populate('acces','ressource');

    // Respond with view.
    return exits.success({
      superviseurs
    });

  }


};
