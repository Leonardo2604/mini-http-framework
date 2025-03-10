import { Router } from '../http';

export const register = (router: Router) => {
  router.get('/users', async (req, res) => {
    console.log('olá');

    res
      .status(200)
      .json([
        {
          id: 1,
          name: 'John Doe',
        },
        {
          id: 2,
          name: 'Jane Doe',
        },
      ])
      .send();
  });

  router.get('/users/:userId', async (req, res) => {
    res
      .status(200)
      .json({
        id: 1,
        name: 'John Doe',
      })
      .send();
  });
};
