import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// before doing save op'r
userSchema.pre("save", async function (next) {
  // not using arrow () since i need to use 'this'.
  if (!this.isModified("password")) {
    // if password is not modified in this process
    next();
  }
  // if password !modified then encrypt it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// .methods allows custom methods on User/model like 'matchPassword' here. Here it return T/F if password provided matches any encrypted password in db.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
