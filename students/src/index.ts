import app from './app';

const start = async () => {
  try {
    //connect to db
    //prisma already handled
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Listening on port 5000!!!!!!!!');
  });
};

start();
