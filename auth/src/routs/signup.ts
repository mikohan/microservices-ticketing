import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  console.log('Hi there');
});

export { router as signupRouter };
