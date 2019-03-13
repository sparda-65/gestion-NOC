module.exports = {


  friendlyName: 'View available superviseurs',


  description: 'Display "Available superviseurs" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/superviseurs/available-superviseurs'
    }

  },


  fn: async function (inputs, exits) {

    var url = require('url');

    var superviseurs = await Superviseur.find().populate('ressources').populate('acces').populate('equipe').populate('prestataire');
    var ressources = await Ressources.find();
    var acces = await Acces.find();
    var equipes= await Equipes.find();
    var prestataires= await Prestataires.find();

    _.each(superviseurs, (superviseur)=> {
      superviseur.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/superviseurs/'+superviseur.id+'/photo');
      delete superviseur.imageUploadFd;
      delete superviseur.imageUploadMime;
    });

    // Respond with view.
    return exits.success({
      currentSection: 'superviseurs',
      superviseurs: superviseurs,
      ressources,
      acces:acces,
      prestataires,
      equipes,
    });


  }


};
