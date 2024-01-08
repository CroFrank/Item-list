const equipments = require("./equipment")
const Equipment = require("../model/equipment")
const mongoose = require("mongoose")

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/zajebansija")
  console.log("Mongoose is ON!")
}

const equipmentSeed = async function () {
  await Equipment.deleteMany({})
  for (let equipment in equipments) {
    const seeded = new Equipment({
      name: equipment,
      price: equipments[equipment],
    })
    await seeded.save()
    console.log(seeded)
  }
  process.exit()
}

equipmentSeed()
