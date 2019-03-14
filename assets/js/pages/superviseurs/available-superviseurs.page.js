parasails.registerPage('available-superviseurs', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    superviseurs:[],
    ressources:[],
    addRessource:'',
    addAcce:'',
    addEquipe:'',
    addPrestataire:'',

    confirmDeleteSupModalOpen: false,
    confirmDeleteRessModalOpen: false,
    confirmDeleteAccModalOpen: false,
    confirmDeleteEquipeModalOpen: false,
    confirmDeletePrestataireModalOpen: false,
    selectedSup: undefined,
    selectedRessource:undefined,
    selectedAcce:undefined,
    selectedEquipe:undefined,
    selectedPrestataire:undefined,
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
      previewImageSrc: '',
      prestataire:''
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
    $('#example').DataTable({
      'language': {
        'lengthMenu': 'Afficher _MENU_ Superviseurs par page',
        'zeroRecords': 'Aucun Superviseur',
        'info': 'page _PAGE_ / _PAGES_',
        'infoEmpty': 'Aucun Superviseur',
        'infoFiltered': '(filtrer à partir de _MAX_ Superviseurs)'
      }
    });
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
        previewImageSrc: '',
        prestataire:''
      };
      this.selectedRess=[];
      this.selectedAcc=[];
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
      var ress=[];
      var acc=[];
      this.selectedRess.forEach(element => {
        ress.push(element.id);
      });

      this.selectedAcc.forEach(element => {
        acc.push(element.id);
      });

      this.uploadFormData.ressources= JSON.stringify(ress);
      this.uploadFormData.acces= JSON.stringify(acc);
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
      console.log('selectedRess :  '+this.selectedRess);

      var newItem = _.extend(result,{
        id:result.id,
        nom:this.uploadFormData.nom,
        prenom:this.uploadFormData.prenom,
        dateEntry:this.uploadFormData.dateEntry,
        equipe:this.uploadFormData.equipe,
        dateFin:this.uploadFormData.dateFin,
        actif: this.uploadFormData.actif,
        chart: this.uploadFormData.chart,
        ressources: this.selectedRess,
        acces:this.selectedAcc,
        prestataire:this.uploadFormData.prestataire,
      });
      console.log(newItem);
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

    // Methodes ajouter ressource

    clickAddRess: function() {
      // Open the modal.
      this.goto('/superviseurs/newRess');
      console.log('clicked Add Button');
    },

    submittedAddRessourceForm: function(result){

      console.log('submittedAddRessourceForm');
      var newRess = _.extend(result,{
        id:result.id,
        ressource:this.addRessource,
      });

      this.ressources.unshift(newRess);

      // Close the modal.
      //this.closeAddRessourceModal();
    },

    closeAddRessourceModal: function () {
      console.log('clicked close button');
      // Close modal
      this.goto('/superviseurs');
      this.addRessource='';
    },

    handleParsingAddRessForm: function() {
      // Clear out any pre-existing error messages.
      console.log(this.addRessource);
      this.formErrors = {};
      return{
        ressource:this.addRessource
      };
    },

    // comfirmation de supressiom d'une ressource

    clickDeleteRess: function(ressId){
      console.log('clicked Delete ressource button');
      this.confirmDeleteRessModalOpen=true;
      this.selectedRessource=_.find(this.ressources,{id:ressId});
      console.log(this.selectedRessource);
    },

    closeDeleteRessModal: function () {
      // // Close modal
      // this.goto('/superviseurs');
      this.selectedRessource=undefined;
      this.confirmDeleteRessModalOpen=false;
    },

    handleParsingDeleteRessForm: function () {
      return{
        id:this.selectedRessource.id
      };
    },

    submittedDeleteRessForm:function () {
      console.log('OK its work');
      // this.goto('/superviseurs');
      _.remove(this.ressources, { id: this.selectedRessource.id});
      this.$forceUpdate();
      this.confirmDeleteRessModalOpen=false;
      this.selectedRessource=undefined;
    },

    // Methodes ajouter acce

    clickAddAcc: function() {
      // Open the modal.
      this.goto('/superviseurs/newAcc');
      console.log('clicked Add Button');
    },

    submittedAddAcceForm: function(result){

      console.log('submittedAddRessourceForm');
      var newAcc = _.extend(result,{
        id:result.id,
        acce:this.addAcce,
      });

      this.acces.unshift(newAcc);
    },

    closeAddAcceModal: function () {
      console.log('clicked close button');
      // Close modal
      this.goto('/superviseurs');
      this.addAcce='';
    },

    handleParsingAddAccForm: function() {
      // Clear out any pre-existing error messages.
      console.log(this.addAcce);
      this.formErrors = {};
      return{
        acce:this.addAcce
      };
    },

    // comfirmation de supressiom d'un Acce

    clickDeleteAcc: function(accId){
      console.log('clicked Delete accs button');
      this.confirmDeleteAccModalOpen=true;
      this.selectedAcce=_.find(this.acces,{id:accId});
      console.log(this.selectedAcce);
    },

    closeDeleteAccModal: function () {
      this.selectedAcce=undefined;
      this.confirmDeleteAccModalOpen=false;
    },

    handleParsingDeleteAccForm: function () {
      return{
        id:this.selectedAcce.id
      };
    },

    submittedDeleteAccForm:function () {
      console.log('OK its work');
      _.remove(this.acces, { id: this.selectedAcce.id});
      this.$forceUpdate();
      this.confirmDeleteAccModalOpen=false;
      this.selectedAcce=undefined;
    },

    // Methodes ajouter Equipe

    clickAddEquipe: function() {
      // Open the modal.
      this.goto('/superviseurs/newEquipe');
      console.log('clicked Add Button');
    },

    submittedAddEquipeForm: function(result){

      console.log('submittedAddEquipeForm');
      var newEquipe = _.extend(result,{
        id:result.id,
        equipe:this.uploadFormData.equipe,
      });

      this.equipes.unshift(newEquipe);
    },

    closeAddEquipeModal: function () {
      console.log('clicked close button');
      // Close modal
      this.goto('/superviseurs');
      this.uploadFormData.equipe='';
    },

    handleParsingAddEquipeForm: function() {
      // Clear out any pre-existing error messages.
      console.log(this.uploadFormData.equipe);
      this.formErrors = {};
      return{
        equipe:this.uploadFormData.equipe
      };
    },

    // comfirmation de supressiom d'un Acce

    clickDeleteEquipe: function(EquipeId){
      console.log('clicked Delete accs button');
      this.confirmDeleteEquipeModalOpen=true;
      this.selectedEquipe=_.find(this.equipes,{id:EquipeId});
      console.log(this.selectedEquipe);
    },

    closeDeleteEquipeModal: function () {
      this.selectedEquipe=undefined;
      this.confirmDeleteEquipeModalOpen=false;
    },

    handleParsingDeleteEquipeForm: function () {
      return{
        id:this.selectedEquipe.id
      };
    },

    submittedDeleteEquipeForm:function () {
      console.log('OK its work');
      _.remove(this.equipes, { id: this.selectedEquipe.id});
      this.$forceUpdate();
      this.confirmDeleteEquipeModalOpen=false;
      this.selectedEquipe=undefined;
    },

    // Methodes ajouter Prestataire

    clickAddPrestataire: function() {
      // Open the modal.
      this.goto('/superviseurs/newPrestataire');
      console.log('clicked Add Button');
    },

    submittedAddPrestataireForm: function(result){

      console.log('submittedAddEquipeForm');
      var newPrestataire = _.extend(result,{
        id:result.id,
        prestataire:this.uploadFormData.prestataire,
      });

      this.prestataires.unshift(newPrestataire);
    },

    closeAddPrestataireModal: function () {
      console.log('clicked close button');
      // Close modal
      this.goto('/superviseurs');
      this.uploadFormData.prestataire='';
    },

    handleParsingAddPrestataireForm: function() {
      // Clear out any pre-existing error messages.
      console.log(this.uploadFormData.prestataire);
      this.formErrors = {};
      return{
        prestataire:this.uploadFormData.prestataire
      };
    },

    // comfirmation de supressiom Prestataire

    clickDeletePrestataire: function(prestataireId){
      console.log('clicked Delete accs button'+prestataireId);
      this.confirmDeletePrestataireModalOpen=true;
      this.selectedPrestataire=_.find(this.prestataires,{id:prestataireId});
      console.log(this.selectedPrestataire);
    },

    closeDeletePrestataireModal: function () {
      this.selectedPrestataire=undefined;
      this.confirmDeletePrestataireModalOpen=false;
    },

    handleParsingDeletePrestataireForm: function () {
      return{
        id:this.selectedPrestataire.id
      };
    },

    submittedDeletePrestataireForm:function () {
      console.log('OK its work');
      _.remove(this.prestataires, { id: this.selectedPrestataire.id});
      this.$forceUpdate();
      this.confirmDeletePrestataireModalOpen=false;
      this.selectedPrestataire=undefined;
    },
  }
});
