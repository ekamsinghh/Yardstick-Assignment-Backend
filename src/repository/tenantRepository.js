const Tenant = require("../models/tenant");

const findTenantBySlug = async (slug) => {
  try {
    return await Tenant.findOne({ slug });
  } catch (err) {
    throw new Error("Error finding tenant by slug: " + err.message);
  }
};

const upgradeTenantSubscription = async (tenantId) => {
  try {
    const tenant = await Tenant.findOne({ _id: tenantId });
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    tenant.plan = "pro";
    await tenant.save();
    return tenant;
  } catch (err) {
    throw new Error("Error upgrading tenant subscription: " + err.message);
  }
};

const findTenantById = async (id) => {
  try {
    return await Tenant.findById(id);
  } catch (err) {
    throw new Error("Error finding tenant by ID: " + err.message);
  }
}

module.exports = {
  findTenantBySlug,
  upgradeTenantSubscription,
  findTenantById
};
