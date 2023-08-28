<h2>Requirements</h2>

* NodeJS 18.x
* PostgreSQL

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone this repository</p>

```bash
git clone https://github.com/wyakaga/klontong-api.git
```

<p>2. Change the working directory into folder directory</p>

```bash
cd klontong-api
```

<p>3. Install with npm</p>

```bash
npm install
```

<p>4. Create .env file</p>

```env
NODE_ENV = development
PORT = [your server port number]
JWT_SECRET = [your jwt secret]

DB_USERNAME = [your database username]
DB_PASSWORD = [your database password]
DB_NAME = [your database name]
DB_HOST = localhost

CLOUD_NAME = [your Cloudinary name]
CLOUD_KEY = [your Cloudinary key]
CLOUD_SECRET = [your Cloudinary secret]
CLOUD_FOLDER = [your Cloudinary folder name]
```

<p>7. Migrate and seed database</p>

*migrate :*

```bash
npx sequelize-cli db:migrate
```

*seed :*

```bash
npx sequelize-cli db:seed:all
```

<p>6. Run with npm</p>

```bash
npm run dev
```

<h2>👤 Demo Account</h2>

*Admin :*

```
email: admin@mail.com
password: admin123
```

*Customer :*

```
email: user@mail.com
password: user123
```

*take a look at the [postman collection](klontong.postman_collection.json) to run the API*
