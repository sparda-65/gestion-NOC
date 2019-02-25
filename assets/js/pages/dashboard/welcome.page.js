parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dashboardModalVisible: false,
    date:'',
    disponible:{
      equipe1:[],
      equipe2:[],
      equipe3:[],
      equipe4:[],
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {

    $( document ).ready(() => {
      this.clickShiftButton();
    });
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickOpenDashboardModalButton: async function() {
      this.dashboardModalVisible = true;
    },

    closeDashboardModal: async function() {
      this.dashboardModalVisible = false;
    },

    clickShiftButton: function(){
      if(this.date ===''){
        this.date=new Date(Date.now());
        console.log(new Date());
      }

      function diffdate(d1,d2){
        var WNbJours = d2.getTime() - d1.getTime();
        return Math.ceil(WNbJours/(1000*60*60*24));
      }

      var dateRef= new Date('2018/01/02');
      var dateActu=new Date(this.date);
      // var d1=dateActu.getTime()/86400000;
      // var d2=objetRef.dateRef.getTime()/86400000;
      // var diff= new Number(d1 - d2).toFixed(0);
      console.log(dateRef);
      console.log(dateActu);
      var diff=diffdate(dateRef,dateActu);
      console.log(diff);
      var reste= diff % 8;
      console.log(reste);

      if(reste===0){
        this.disponible.equipe1=[true,false,false];
        this.disponible.equipe2=[false,true,false];
        this.disponible.equipe3=[false,false,false];
        this.disponible.equipe4=[false,false,true];
        console.log('A=M B=A C=X D=N');
        console.log(this.disponible);
      }
      if(reste===1){
        this.disponible.equipe1=[true,false,true];
        this.disponible.equipe2=[false,true,false];
        this.disponible.equipe3=[false,false,false];
        this.disponible.equipe4=[false,false,false];
        console.log('A=M B=A C=X D=N');
        console.log(this.disponible);
      }

      if(reste===2){
        this.disponible.equipe1=[false,false,true];
        this.disponible.equipe2=[true,false,false];
        this.disponible.equipe3=[false,true,false];
        this.disponible.equipe4=[false,false,false];
        console.log('A=N B=M C=A D=X');
      }
      if(reste===3){
        this.disponible.equipe1=[false,false,false];
        this.disponible.equipe2=[true,false,true];
        this.disponible.equipe3=[false,true,false];
        this.disponible.equipe4=[false,false,false];
        console.log('A=N B=M C=A D=X');
      }

      if(reste===4){
        this.disponible.equipe1=[false,false,false];
        this.disponible.equipe2=[false,false,true];
        this.disponible.equipe3=[true,false,false];
        this.disponible.equipe4=[false,true,false];
        console.log('A=X B=N C=M D=A');
      }
      if(reste===5){
        this.disponible.equipe1=[false,false,false];
        this.disponible.equipe2=[false,false,false];
        this.disponible.equipe3=[true,false,true];
        this.disponible.equipe4=[false,true,false];
        console.log('A=X B=N C=M D=A');
      }

      if(reste===6){
        this.disponible.equipe1=[false,true,false];
        this.disponible.equipe2=[false,false,false];
        this.disponible.equipe3=[false,false,true];
        this.disponible.equipe4=[true,false,false];
        console.log('A=A B=X C=N D=M');
      }
      if(reste===7){
        this.disponible.equipe1=[false,true,false];
        this.disponible.equipe2=[false,false,false];
        this.disponible.equipe3=[false,false,false];
        this.disponible.equipe4=[true,false,true];
        console.log('A=A B=X C=N D=M');
      }

    },
  }
});
