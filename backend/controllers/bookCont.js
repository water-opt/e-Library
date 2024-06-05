const express = require('express');
const Books = require('../models/booksMod');

const bookData = async (req, res) => {
    try {
        const books = await Books.find({});
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    bookData
}