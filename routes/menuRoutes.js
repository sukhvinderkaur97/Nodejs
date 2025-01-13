const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

router.post('/', async (req, res) => {
    try {
        const menuData = req.body;
        const newItem = new Menu(menuData);
        const response1 = await newItem.save();
        console.log('data saved for menu');
        res.status(200).json(response1);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        const tastes = await Menu.find({ taste: tasteType });
        res.json(tastes);
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        });

        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        res.json(updatedMenu);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete(':id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const deletedItem = await Menu.findByIdAndDelete(menuId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;