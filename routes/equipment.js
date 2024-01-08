const express = require("express")
const router = express.Router()
const catchAsync = require("../utils/catchAsync")
const Equipment = require("../model/equipment")

router.get("/", async (req, res) => {
  const equipment = await Equipment.find({})
  res.render("index", { equipment })
})

router.get("/new", (req, res) => {
  res.render("new")
})

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const equip = await Equipment.findById(id)
    res.render("show", { equip })
  })
)

router.post(
  "/new",
  catchAsync(async (req, res, next) => {
    const equipment = new Equipment(req.body.equipment)
    await equipment.save()
    res.redirect(`/${equipment._id}`)
  })
)

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params
  const equip = await Equipment.findById(id)
  res.render("edit", { equip })
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const newEquip = await Equipment.findByIdAndUpdate(id, {
    ...req.body.equipment,
  })
  res.redirect("/")
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await Equipment.findByIdAndDelete(id)
  res.redirect("/")
})

module.exports = router
