parasails.registerPage('available-superviseurs', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    superviseurs:[],
    confirmDeleteSupModalOpen: false,
    selectedSup: undefined,

    //syncing / loading status
    syncing:false,
    //validation errors
    formErrors:{},
    //status erreur serveur
    cloudError:''
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
      $('#example').DataTable();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickDeleteSup: function(superviseurId){
      console.log('clicked Delete thing button');
      this.confirmDeleteSupModalOpen=true;
      this.selectedSup=_.find(this.superviseurs,{id:superviseurId})
      console.log(this.selectedSup);
    },

    closeDeleteSupModal: function () {
      this.selectedSup=undefined;
      this.confirmDeleteSupModalOpen=false;
    },

    handleParsingDeleteSupForm: function () {
      return{
        id:this.selectedSup.id
      };
    },

    submittedDeleteSupForm:function () {
      console.log('OK its work');
      _.remove(this.superviseurs, { id: this.selectedSup.id});
      this.$forceUpdate();
      this.confirmDeleteSupModalOpen=false;
      this.selectedSup=undefined;
    },
  }
});
