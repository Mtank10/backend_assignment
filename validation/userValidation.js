import {z} from "zod";

const geoSchema = z.object({
    lat :z.string().nonempty("Latitude is required"),
    lng :z.string().nonempty("Longitude is required"),
});

const addressSchema = z.object({
    city: z.string().nonempty("City is required"),
    zipcode:z.string().nonempty("Zipcode is required"),
    geo: geoSchema,
});

const userSchema = z.object({
    name:z.string().min(3,"name to short").max(50,"name to long"),
    email:z.string().email("Invalid email format"),
    phone:z.string().nonempty("Phone number is required").max(10, "Phone number should be 10 digits"),
    address:z.array(addressSchema).min(1,"At least one address is required"),
})

export {userSchema}