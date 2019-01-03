parasails.registerPage('available-superviseurs', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    superviseurs:[],

    confirmDeleteSupModalOpen: false,
    selectedSup: undefined,
    selectedRess:[],
    selectedAcc:[],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    uploadFormData: {
      photo: undefined,
      nom: '',
      prenom:'',
      dateEntry:'',
      equipe:'',
      dateFin:'',
      actif: undefined,
      chart: undefined,
      ressources:[],
      acces:[],
      previewImageSrc: ''
    },

    //syncing / loading status
    syncing:false,
    //validation errors
    formErrors:{},
    //status erreur serveur
    cloudError:'',

  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/superviseurs\/?([^\/]+)?/,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    $('#example').DataTable();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    // Methodes supprimer superviseur
    clickDeleteSup: function(superviseurId){
      console.log('clicked Delete thing button');
      this.confirmDeleteSupModalOpen=true;
      this.selectedSup=_.find(this.superviseurs,{id:superviseurId});
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

    // Methodes ajouter superviseur

    _clearUploadSupModal: function() {
      // Close modal
      this.goto('/superviseurs');
      // Reset form data
      this.uploadFormData = {
        photo: undefined,
        nom: '',
        prenom:'',
        dateEntry:'',
        equipe:'',
        dateFin:'',
        actif: undefined,
        chart: undefined,
        ressources:[],
        acces:[],
        previewImageSrc: ''
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    clickAddButton: function() {
      // Open the modal.
      this.goto('/superviseurs/new');
    },

    closeUploadSupModal: function() {
      this._clearUploadSupModal();
    },

    handleParsingUploadSupForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};
      this.uploadFormData.ressources= JSON.stringify(this.selectedRess);
      this.uploadFormData.acces= JSON.stringify(this.selectedAcc);
      console.log(this.selectedRess);
      console.log(this.selectedAcc);
      var argins = this.uploadFormData;

      if(!argins.photo) {
        this.formErrors.photo = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return _.omit(argins, ['previewImageSrc']);
    },

    submittedUploadSupForm: function(result){

      console.log('submittedUploadSupForm'+this.uploadFormData.ressources);

      var newItem = _.extend(result,{
        id:result.id,
        nom:this.uploadFormData.nom,
        prenom:this.uploadFormData.prenom,
        dateEntry:this.uploadFormData.dateEntry,
        equipe:this.uploadFormData.equipe,
        dateFin:this.uploadFormData.dateFin,
        actif: this.uploadFormData.actif,
        chart: this.uploadFormData.chart,
        ressources: JSON.parse(this.uploadFormData.ressources),
        acces:JSON.parse(this.uploadFormData.acces),
      });


      // Add the new thing to the list
      this.superviseurs.unshift(newItem);

      // Close the modal.
      this._clearUploadSupModal();
    },

    changeFileInput: function(files) {
      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
      }
      var selectedFile = files[0];

      // If you cancel from the native upload window when you already
      // have a photo tracked, then we just avast (return early).
      // In this case, we just leave whatever you had there before.
      if (!selectedFile && this.uploadFormData.photo) {
        return;
      }

      this.uploadFormData.photo = selectedFile;

      // Set up the file preview for the UI:
      var reader = new FileReader();
      reader.onload = (event)=>{
        this.uploadFormData.previewImageSrc = event.target.result;

        // Unbind this "onload" event.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);

    },


  }
});
