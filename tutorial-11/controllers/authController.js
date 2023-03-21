require('dotenv').config({ debug: true });
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

async function handleLogin(req, res) {
  console.log('TOKEN: ', `${process.env.ACCESS_TOKEN_SECRET}`);

  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  const foundUser = usersDB.users.find(person => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }, // 5-15 minutes
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    // logout
    const otherUsers = usersDB.users.filter(
      person => person.username !== foundUser.username,
    );
    // Saving refreshToken with current user
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users),
    );
    // res.json({ success: `User ${user} is logged in!` });
    // more secure: not available to JavaScript
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1d
    });
    res.json({ accessToken }); // as a frontend consumer store this in memory.
  } else {
    return res.sendStatus(401); // Unauthorized
  }
}

module.exports = { handleLogin };
