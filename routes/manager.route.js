const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ensureRole = require('../middleware/authMiddleware')


router.get('/dashboard', ensureRole('BRANCH_MANAGER'), async (req, res, next) => {
  const branchId = req.user.branchId;
  const orders = await prisma.order.findMany({
    where: { branchId },
    include: { user: true, branch: true, menuItem: true },
  });
  res.render('branch-report', { orders });
});

router.get('/hqm-report', ensureRole('HQM'), async (req, res, next) => {
  const orders = await prisma.order.findMany({
    include: { user: true, branch: true, menuItem: true },
  });
  res.render('hqm-report', { orders });
});






module.exports = router;