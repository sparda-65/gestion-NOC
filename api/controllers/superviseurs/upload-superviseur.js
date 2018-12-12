module.exports = {


  friendlyName: 'Upload superviseur',


  description: '',

  files: ['photo'],

  inputs: {

    photo: {
      description: 'Upstream for an incoming file upload.',
      type: 'ref'
    },

    nom: {type: 'string'},
    prenom:{type: 'string',},
    dateEntry:{type: 'string',},
    equipe:{type: 'string',},
    dateFin:{type: 'string'},
    actif: {type:'boolean'},
    chart:{type:'boolean'},
    ressources:{type: 'json', columnType:'array'},
    acces:{type: 'json', columnType:'array'},

  },


  exits: {

    success: {
      outputDescription: 'The newly created `Superviseur`.',
      outputExample: {}
    },

    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {
    console.log('Upload superviseur');
    var url = require('url');
    var util = require('util');

    // Upload the image.
    var info = await sails.uploadOne(inputs.photo, {
      maxBytes: 3000000
    })
    // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
    // `maxBytes` for both skipper-disk and skipper-s3.
      .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
      .intercept((err)=>new Error('The photo upload failed: '+util.inspect(err)));

    if(!info) {
      throw 'noFileAttached';
    }
    console.log(info);
    // Create a new "Superviseur" record.
    var newSuperviseur = await Superviseur.create({
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      nom: inputs.nom,
      prenom: inputs.prenom,
      dateEntry: inputs.dateEntry,
      equipe: inputs.equipe,
      dateFin: inputs.dateFin,
      actif: inputs.actif,
      chart: inputs.chart,
      ressources: JSON.parse(inputs.ressources),
      acces: inputs.acces,
    }).fetch();

    var imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/superviseurs/'+newSuperviseur.id+'/photo');

    // Return the newly-created thing, with its `imageSrc`
    return exits.success({
      id: newSuperviseur.id,
      imageSrc
    });
  }


};
