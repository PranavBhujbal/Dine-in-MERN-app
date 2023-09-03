const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Dinein:Dinein@cluster0.gbhlcvx.mongodb.net/Dinein?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("Food_items");
      let data = await fetched_data.find({}).toArray() 
      const foodCategory = mongoose.connection.db.collection("Food_Category");
      let catdata = await foodCategory.find({}).toArray()
       
        global.Food_items = data;
        global.Food_Category = catdata;
      

    } catch (error) {
      console.log('err: ', error);
    }
  };

module.exports = mongoDB;
