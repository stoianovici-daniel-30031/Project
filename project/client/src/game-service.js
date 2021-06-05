function games() {
  get = function () {
    return axios.get('http://localhost:3000/games');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/games/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
