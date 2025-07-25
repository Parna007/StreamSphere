import admin from '../firebaseAdmin.js'; 
import User from '../models/user.model.js';

export async function googleLogin(req, res) {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email, picture } = decodedToken;

    let user = await User.findOne({ uid }); // ← Use your Mongoose model

    if (!user) {
      user = new User({
        uid,
        name,
        email,
        photoURL: picture,
      });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
}
