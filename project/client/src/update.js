function run() {
    new Vue({
        el: '#update',
        data: {
            id: '',
            message: '',
            game: {}
        },
        created: function () {

            let uri = window.location.search.substring(1);
            let params = new URLSearchParams(uri);
            this.id = params.get("id");

            axios.get('http://localhost:3000/games/'+this.id).then(
                (response) => {
                    this.game = response.data;
                }
            );
        },
        methods: {
            update: function(){
                console.dir(this.game);

                return axios.post('http://localhost:3000/games', this.game).then(
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