const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { roles } = require('../utils/constants');
const { branch } = require('../utils/constants');


router.get('/users', async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.render('manage-users', { users });
    } catch (error) {
      next(error);
    }
  });


router.post('/update-role', async (req, res, next) => {
    try {
        const { id, role } = req.body;
    
        // Checking for id and roles in req.body
        if (!id || !role) {
          req.flash('error', 'Invalid request');
          return res.redirect('back');
        }
    
        // Check for valid role
        const rolesArray = Object.values(roles);
        if (!rolesArray.includes(role)) {
          req.flash('error', 'Invalid role');
          return res.redirect('back');
        }
    
        // Admin cannot remove himself/herself as an admin
        if (req.user.id === parseInt(id)) {
          req.flash(
            'error',
            'Admins cannot remove themselves from Admin.'
          );
          return res.redirect('back');
        }
    
        // Update the user
        const user = await prisma.user.update({
          where: { id: parseInt(id) },
          data: { role },
        });
    
        req.flash('info', `Updated role for ${user.email} to ${user.role}`);
        res.redirect('back');
      } catch (error) {
        next(error);
      }
    }
);




router.post('/update-branch', async (req, res, next) => {
    try {
      const { id, branch } = req.body;
  
      // Checking for id and branch in req.body
      if (!id || !branch) {
        req.flash('error', 'Invalid request');
        return res.redirect('back');
      }
  
      // Admin cannot change his/her branch
      if (req.user.id === parseInt(id)) {
        req.flash(
          'error',
          'Admins cannot change their own branch'
        );
        return res.redirect('back');
      }
  
      // Update the user's branch
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { Branch: parseInt(branch) }, 
      });
  
      req.flash('info', `Updated branch for ${user.email} to ${user.Branch}`);
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  });

   
module.exports = router;