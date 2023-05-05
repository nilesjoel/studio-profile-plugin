
module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    console.log("beforeCreate", data, where, select, populate);
    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  },

  afterCreate(event) {
    const { result, params } = event;
    console.log("afterCreate", result, params)
    // do something to the result;
  },
  beforeFindOne(event) {
    const { data, where, select, populate } = event.params;
    console.log("beforeFindOne", data, where, select, populate);
    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  }
};