const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// Configurar la conexión a MongoDB
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});

// Definir los esquemas y modelos para las colecciones
const cartSchema = new mongoose.Schema({
  // Propiedades del carrito
});

const messageSchema = new mongoose.Schema({
  user: String,
  message: String
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Cart = mongoose.model('Cart', cartSchema);
const Message = mongoose.model('Message', messageSchema);
const Product = mongoose.model('Product', productSchema);

// Crear una instancia de Express
const app = express();

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar rutas y controladores
app.get('/', (req, res) => {
  res.render('home', { title: 'Ecommerce' });
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/chat', (req, res) => {
  res.render('chat', { title: 'Chat' });
});

app.post('/chat', async (req, res) => {
  const { user, message } = req.body;
  const newMessage = { user, message };

  try {
    await Message.create(newMessage);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
