import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      // "mongodb+srv://gvchannelid:9003998648@cluster0.rn5br.mongodb.net/food-del"
      "mongodb+srv://gvchannelid:9003998648@cluster0.cmp2d.mongodb.net/food-del"
    )
    .then(() => {
      console.log("DB Connection successfull");
    });
};
