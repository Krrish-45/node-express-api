const userProfileModel = require('../database/mongodb').models.userProfile

const getOneUserProfile = async data => await userProfileModel.findOne(data)

const getOneStaffDetail = async data => {
  await userProfileModel.findOne(data)
}

const createUserProfile = async req => {
  const files = req.files
  return await userProfileModel.create(req.body)
}

module.exports = {
  getOneUserProfile,
  getOneStaffDetail,
  createUserProfile,
}
