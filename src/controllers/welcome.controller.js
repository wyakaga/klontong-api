module.exports = {
  welcomeMessage: (req, res) => {
    res.status(200).json({
      status: 200,
      msg: 'Welcome to klontong REST API!',
      authors: [
        {
          name: 'wyakaga',
          repository: 'https://github.com/wyakaga',
        },
      ],
    });
  },
};