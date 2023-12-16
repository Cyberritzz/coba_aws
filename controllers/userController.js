const { response } = require("express");
const prisma = require("../database/index");
const authJwt = require("../middlewares/authJwt");
const bcrypt = require("bcrypt");

module.exports = {
    getProduct : async (req, res) => {
        try {
            const result = await prisma.product.findMany({
                select :{
                    id : true,
                    name_product : true,
                    thumbnail : true,
                    description : true,
                    type_product : true,
                    category : true
                }
            })

            if (!result){
                res.send({ message : "data not found" })
            }

            res.json(result);
        } catch (error) {
            res.send({ message : error.message })
        }
    },

    getProductById : async (req, res) => {
        try {
            const productId = parseInt(req.params.id);

            const product = await prisma.product.findFirst({
                where : { id : productId }
            });

            if (!product){
                res.send({ message : "data not found" })
            }

            res.json(product);
        } catch (error) {
            res.send({ message : error.message })
        }
    },

    downloadFile : async (req, res) => {
        try {
            const productId = parseInt(req.params.id);
            const userId = parseInt(req.params.id_user);

            await prisma.history.create({
                data : { id_product : productId, id_user : userId}
            });
            
            const limit = await prisma.user.findFirst({
                where : { id : userId },
                select : { limit : true, is_membership : true }
            });

            console.log(limit)
            if (limit.is_membership === false){
                await prisma.user.update({
                    where : { id : userId },
                    data : { limit : limit.limit - 1}
                });
            }
            
            const product = await prisma.product.findFirst({
                where : { id : productId }
            });

            if (!product){
                res.send({ message : "data not found" })
            }

            res.json(product.source_file);
        }
        catch (error) {
            res.send({ message : error.message })
        }
    },
    updateUserMail : async(req, res) => {
        try{
            const id = parseInt(req.params.id);
            const data = {
                fullname : req.body.fullName,
                email : req.body.email,
                contact : req.body.contact
            }
            console.table(data)

            const result = await prisma.user.update({
                where : {id : id},
                data : data
            })

            if (!result) {
                res.send({ message: "Update Failed" });
            }
        
            res.status(200).send({ message: "Update Success", result });

        }catch(err){
            res.send({ message : err.message})
        }
    },

    updatePassword : async(req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { oldPassword,newPassword } = req.body;

            const user = await prisma.user.findFirst({
                where : {id : id}
            })

            const passwordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            const newHashedPassword = bcrypt.hashSync(newPassword,10);
            const updateData = await prisma.user.update({
                where : {id : id},
                data : {
                    password : newHashedPassword,
                }
            })

            if(!updateData){
                res.send({ message: "Update Failed" });
            }
            res.status(200).send({ message: "Update Success", updateData });

        } catch (error) {
            res.send({ message : error.message })
        }
    },

    getHistory : async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await prisma.history.findMany({
                where : { id_user : id },
                include : {
                    product : true,
                    user : true
                }
            })

            if (!result){
                res.send({ message : "data not found" })
            }

            console.log(result);
            res.json(result);
        } catch (error) {
            res.send({ message : error.message })
        }
    }
}