import { prisma } from "../connection/dbconnect.js";
import { userSchema } from "../validation/userValidation.js";
import { z } from "zod";

async function createUser(req,res){
    try {
       const validatedData = userSchema.parse(req.body);

       const email = validatedData.email;
       const existingUser = await prisma.user.findUnique({
           where: { email }
       });

       if (existingUser) {
           return res.status(400).json({ error: "User with this email already exists" });
       }

       const newUser = await prisma.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            address: {
                create: validatedData.address.map(addr => ({
                    city: addr.city,
                    zipcode: addr.zipcode,
                    geo: {
                        create: {
                            lat: addr.geo.lat,
                            lng: addr.geo.lng
                        }
                    }
                }))

            },
            
        },
         include: {
            address: {
                include: {
                    geo: true
                }
            }
        }
       })
       res.status(201).json({
               message: "User created successfully",
                user: newUser,
                status: "success"

       })
    }
    catch (error){
        if(error instanceof z.ZodError) {
            return res.status(400).json({message:"validation Error", error: error.errors });
        }
        console.error("Error creating user:", error);
        res.status(500).json({message: "Internal server error" });
    }
}

async function getAllUsers(req,res){
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const users = await prisma.user.findMany({
            skip: skip,
            take: limit,
            include: {
                address: {
                    include: {
                        geo: true
                    }
                }
            },
            
        });
        if (users.length === 0) {
            return res.status(200).json({ message: "No users data" });
        }
        res.status(200).json({
            message: "Users retrieved successfully",
            users,
            status: "success"
        });
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserById(req, res) {
   const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                address: {
                    include: {
                        geo: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user,
            status: "success"
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function updateUser(req, res) {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const validatedData = userSchema.parse(req.body);

       
        await prisma.address.deleteMany({
            where: { userId },
        });

       
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                address: {
                    create: validatedData.address.map((addr) => ({
                        city: addr.city,
                        zipcode: addr.zipcode,
                        geo: {
                            create: {
                                lat: addr.geo.lat,
                                lng: addr.geo.lng,
                            },
                        },
                    })),
                },
            },
            include: {
                address: {
                    include: {
                        geo: true,
                    },
                },
            },
        });

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
            status: "success"
        });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }

        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function deleteUser(req, res) {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId }
        });

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser,
            status: "success"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };