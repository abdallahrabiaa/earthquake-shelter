const mongoose = require('mongoose');

class MongooseController {
  constructor(model) {
    this.model = model;
  }

  async create(req, res) {
    try {
      const doc = await this.model.create({ ...req.body });
      res.status(201).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }

  async find(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const docs = await this.model.find().lean().exec();
      const paginatedDocs = docs.slice(startIndex, endIndex);
      res.status(200).json({ data: paginatedDocs });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }

  async findOne(req, res) {
    try {
      const doc = await this.model.findOne({ _id: req.params.id }).lean().exec();
      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }

  async update(req, res) {
    try {
      const doc = await this.model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).lean().exec();
      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }

  async remove(req, res) {
    try {
      const doc = await this.model.findOneAndRemove({ _id: req.params.id }).lean().exec();
      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
}

module.exports = MongooseController;
