/**
 * Superviseur.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    imageUploadFd: {
      type: 'string',
      description: 'The Skipper file descriptor string uniquely identifying the uploaded image.',
      required: true
    },

    imageUploadMime: {
      type: 'string',
      description: 'The MIME type for the uploaded image.',
      required: true
    },

    nom:{type:'string', required:true},

    prenom:{type:'string', required:true},

    dateEntry:{
      type:'string',
      columnType:'date',
      required:true
    },

    equipe:{type:'string'},

    dateFin:{type:'string', columnType:'date'},

    actif:{type:'boolean'},

    chart:{type:'boolean'},

    ressources: { type: 'json', columnType: 'array' },


    acces: { type: 'json', columnType: 'array' },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    // ressources: {
    //   collection: 'ressources',
    //   via: 'owner',
    // },
    // acces: {
    //   collection: 'acces',
    //   via: 'owner',
    // }

  },

};

