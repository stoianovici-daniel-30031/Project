function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      games: [],
      gamesService: null,
      message: ''
    },
    created: function () {
      this.gamesService = games();
      console.log(games());
      this.gamesService.get().then(response => (this.games = response.data));
      console.log( this.games );
    },
    methods: {
      deleteGame: function(id) {
        console.log('HTTP DELETE towards backend, game: '+id);
        this.gamesService.remove(id).then(response => {
          this.gamesService.get().then(response => (this.games = response.data));
        });
      },
    }
  });

  //  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
