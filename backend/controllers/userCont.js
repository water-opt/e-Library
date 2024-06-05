const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userMod');
const nodemailer = require('nodemailer');

const SALT_ROUNDS = 10

const registerUser = async (req, res) => {
  const { username, email, password, address, role} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({error: 'error occured in json body'})
  } else if (await User.findOne({email})) {
    return res.status(400)
  } else {
    try {
      const hashed = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await User.create({username, email, "password": hashed, address, role})

      req.session.userId = user._id

      return res.status(200).json({error: 'user created successfully ..'})
    } catch (errors) {
      console.log(`error: ${errors}`)
      return res.status(400).json({error: 'An error occured'})
    }
  }

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    let user

    user = await User.findOne({ email: email });

    if (user) {
      isMatchUser = bcrypt.compare(password, user.password);
    } else {
      return res.status(200).json({ error: 'Login failed' });
    }

    if (!(isMatchUser)) {
      return res.status(200).json({ error: 'Login failed' }); 
    } else if (isMatchUser) {
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.address = user.address;
      console.log(`Login successful | User: ${user._id} | Role: ${user.role}`);
      res.json({ message: 'Login successful', role: user.role });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
};

const loginRecovery = async (req, res) => {
  const { email } = req.body;
  var userid = null;

  try {
    let user = User.findOne({email: email})

    if (user) {
      userid = user._id;

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hareendilrukshananayakkara@gmail.com',
          pass: 'BADgamer992'
        }
      });
      
      var mailOptions = {
        from: 'hareendilrukshananayakkara@gmail.com',
        to: email,
        subject: 'Account Recovery',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
                <p>Hello,</p>
                <p>You have requested to reset your password. Click the link below to reset your password:</p>
                <p><a href="http://localhost:3000/user/recover/${userid}">Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you.</p>
                <p>Regards,<br>Library Team</p>
            </div>
        </div>
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } else {
      res.status(404).json({ message: 'user not found ..' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
}
 
const passwordRest = async (req, res) => {
  const { userid, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    User.findByIdAndUpdate( userid, {password: hashedPassword} );
    res.status(200).json({ message: 'Password reset successfull ..' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
}

const LogoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout ..' });
    } else {
      return res.status(200).json({ message: 'Logout Successful ..' })
    }
  });
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.session.userId;
  const { username, email, password, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  const userId = req.session.userId;

  try {
    await User.findByIdAndDelete(userId);
    req.session.destroy(); // Destroy session after deleting user
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, address } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { 
  registerUser, 
  loginUser,
  LogoutUser,
  loginRecovery,
  passwordRest,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
   
  getAllUsers, 
  getUserById,
  updateUserById,
  deleteUserById 
};
