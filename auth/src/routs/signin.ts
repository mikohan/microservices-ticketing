import express from 'express';

const router = express.Router();

router.post('/api/users/singnin', (req, res) => {
  console.log('Hi there');
});

export { router as signinRouter };
