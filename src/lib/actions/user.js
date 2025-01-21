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
    await connect();
    const user = await user.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
        },
      },
      // If all fields are exist then true and doesn't exist then add it
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log("Error: Could not create or update user:", error);
  }
};

export const deleteUser = async () => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error: Could not delete user:", error);
  }
};
