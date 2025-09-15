const { findTenantById, findTenantBySlug, upgradeTenantSubscription } = require("../repository/tenantRepository");

const upgradeSubscription = async (req, res) => {
  try {
    const { slug } = req.params;
    const user = req.user; // from protect middleware

    const tenant = await findTenantBySlug(slug);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found", success: false });
    }

    if (user.tenantId.toString() !== tenant._id.toString()) {
      return res.status(403).json({ message: "You cannot upgrade another tenant", success: false });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admins can upgrade subscription", success: false });
    }

    if (tenant.plan === "pro") {
      return res.status(400).json({ message: "Tenant is already on Pro plan", success: false });
    }

    const updatedTenant = await upgradeTenantSubscription(tenant._id);

    res.status(200).json({
      message: "Subscription upgraded to Pro",
      success: true,
      tenant: updatedTenant
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to upgrade subscription", success: false, error: err.message });
  }
};

const getTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await findTenantById(id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found", success: false });
    }
    res.status(200).json({ tenant });
  } catch (err) {
    res.status(500).json({ message: "Failed to get tenant", success: false, error: err.message });
  }
};

module.exports = {
  upgradeSubscription,
  getTenant
};