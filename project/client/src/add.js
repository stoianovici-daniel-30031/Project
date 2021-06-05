function run() {
    new Vue({
        el: '#add',
        date: {
            id: '',
            message: '',
            game: {}
        },
        created: function () {
        },
        methods: {
            add: function(){
                console.dir(this.game);
                return axios.put('http://localhost:3000/games', this.game).then(
                    (response) => {
                        this.message = response.data; // saved
                    }
                );

            }
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    run();
});