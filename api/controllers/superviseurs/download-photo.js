module.exports = {


  friendlyName: 'Download photo',


  description: '',


  inputs: {
    id: {
      description: 'The id of the item whose photo we\'re downloading.',
      type: 'string',
      required: true
    }

  },


  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified thing\'s photo.',
      outputType: 'ref'
    },
    notFound: { responseType: 'notFound' }

  },


  fn: async function (inputs, exits) {

    var superviseur = await Superviseur.findOne({id: inputs.id});

    if (!superviseur) { throw 'notFound'; }

    this.res.type(superviseur.imageUploadMime);

    var downloading = await sails.startDownload(superviseur.imageUploadFd);

    return exits.success(downloading);

  }


};
