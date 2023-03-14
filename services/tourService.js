const { faker } = require("@faker-js/faker");
const Tour = require("../models/Tour");

exports.getAllToursService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy)
    .skip((queries.page - 1) * queries.limit)
    .limit(queries.limit);
  const totalTours = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTours / queries.limit);
  return { totalTours, pageCount, tours };
};

exports.postTourService = async (data) => {
  const tour = new Tour(data);
  await tour.save();
  return { tour };
};

exports.getATourByIdService = async (id) => {
  const tour = await Tour.findById(id);
  await Tour.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
  return { tour };
};

exports.updateATourService = async (id, data) => {
  // const tour = await Tour.findByIdAndUpdate(
  //   id,
  //   { $set: data },
  //   { runValidators: true }
  // );
  const result = await Tour.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.deleteATourService = async (id) => {
  const deletedTour = await Tour.deleteOne({ _id: id });
  return deletedTour;
};

exports.getTrendingToursService = async () => {
  const trendingTours = await Tour.find({}).sort({ viewsCount: -1 }).limit(3);
  return { trendingTours };
};

exports.getCheapestToursService = async () => {
  const cheapestTours = await Tour.find({}).sort({ price: 1 }).limit(3);
  return { cheapestTours };
};

exports.seedToursDatabaseService = async (noOfTour) => {
  for (let i = 0; i < noOfTour; i++) {
    // checking name duplication and avoiding
    let generatedTourName = faker.lorem.words();
    let foundTour = await Tour.findOne({
      name: generatedTourName,
    });

    if (foundTour) {
      generatedTourName = generatedTourName + " " + i;
    }

    // creating tour
    await Tour.create({
      name: generatedTourName,
      fromLocation: faker.address.city(),
      toLocation: faker.address.city(),
      days: Math.ceil(Math.random() * 14),
      price: Math.ceil(Math.random() * 30000),
      imageUrl: faker.image.nature(),
    });
  }
};

exports.deleteAllToursService = async () => {
  const result = await Tour.deleteMany({});
  return { result };
};

// name, fromLocation, toLocation, days, price, imageUrl
