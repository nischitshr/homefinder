import Favourite from "../models/Favourite.js";

// GET all favourites of logged-in user
export const getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user._id });
    res.json(favourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ADD a property to favourites
export const addFavourite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Prevent duplicates
    const exists = await Favourite.findOne({
      user: req.user._id,
      propertyId
    });

    if (exists) {
      return res.status(400).json({ error: "Already in favourites" });
    }

    const fav = await Favourite.create({
      user: req.user._id,
      propertyId
    });

    res.status(201).json(fav);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// REMOVE a property from favourites
export const removeFavourite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const fav = await Favourite.findOneAndDelete({
      user: req.user._id,
      propertyId
    });

    if (!fav) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    res.json({ message: "Removed from favourites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};