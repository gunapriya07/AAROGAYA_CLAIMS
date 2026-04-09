const express = require('express');
const router = express.Router();
const Profile = require('../Model/ProfileSchema');
const User = require('../Model/LoginSchema');

// Get profile by user ID
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update profile by user ID
router.post('/:userId', async (req, res) => {
  try {
    const { name, email, phone, address, dateOfBirth, occupation, profileImage } = req.body;
    let profile = await Profile.findOne({ user: req.params.userId });
    if (profile) {
      // Update
      profile.name = name;
      profile.email = email;
      profile.phone = phone;
      profile.address = address;
      profile.dateOfBirth = dateOfBirth;
      profile.occupation = occupation;
      profile.profileImage = profileImage;
      await profile.save();
      return res.json(profile);
    } else {
      // Create
      profile = new Profile({
        user: req.params.userId,
        name,
        email,
        phone,
        address,
        dateOfBirth,
        occupation,
        profileImage
      });
      await profile.save();
      return res.status(201).json(profile);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
