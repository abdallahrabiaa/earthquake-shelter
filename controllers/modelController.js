const mongoose = require('mongoose');

const create = (model) => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const find = (model) => async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const docs = await model.find().lean().exec();
    const paginatedDocs = docs.slice(startIndex, endIndex);
    res.status(200).json({ data: paginatedDocs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const findOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec();
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const update = (model) => async (req, res) => {
  try {
    const doc = await model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).lean().exec();
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const remove = (model) => async (req, res) => {
  try {
    const doc = await model.findOneAndRemove({ _id: req.params.id }).lean().exec();
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = {
  create,
  find,
  findOne,
  update,
  remove
};

