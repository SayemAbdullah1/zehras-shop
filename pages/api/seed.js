import Product from "@/models/Products";
import User from "@/models/User";
import data from "@/utilities/data";
import db from "@/utilities/db";



const handler = async (req, res) =>{
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users)
    await Product.deleteMany();
    await Product.insertMany(data.products)
    await db.disconnect();
    res.send({message: 'seeded successfully'})
}
export default handler;