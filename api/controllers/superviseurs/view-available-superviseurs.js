module.exports = {


  friendlyName: 'View available superviseurs',


  description: 'Display "Available superviseurs" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/superviseurs/available-superviseurs'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
