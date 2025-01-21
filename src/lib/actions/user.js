import User from "../models/User.model";
import { connect } from "../mongoDb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses
) => {
  try {
    // Connect to the database
    await connect();

    // Update or insert the user
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true }
    );

    console.log("User created or updated:", user);
    return user; // Return the updated or created user
  } catch (error) {
    console.error("Error: Could not create or update user:", error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    // Connect to the database
    await connect();

    // Delete the user
    const deletedUser = await User.findOneAndDelete({ clerkId: id });

    if (deletedUser) {
      console.log("User deleted:", deletedUser);
    } else {
      console.log("User not found for deletion");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error: Could not delete user:", error.message);
    throw error;
  }
};
