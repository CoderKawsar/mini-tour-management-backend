const { default: mongoose } = require("mongoose");

const TourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide a tour name"],
      trim: true,
      unique: [true, "Tour name must be unique"],
    },
    fromLocation: {
      type: String,
      required: [true, "Please, provide a tour name"],
      trim: true,
    },
    toLocation: {
      type: String,
      required: [true, "Please, provide a tour name"],
      trim: true,
    },
    days: {
      type: Number,
      required: true,
      min: [1, "Days can't be negative or zero"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    imageUrl: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    viewsCount: {
      type: Number,
      select: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
