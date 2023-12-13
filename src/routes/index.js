const { pingController } = require("../controllers/ping-controller");
const { busCreateController } = require("../controllers/bus-controller");
const cors = require('cors');

const stripe = require("stripe")(
  "sk_test_51OMsZzSIVwEMKq3NZuEnw0XNKQJ6jhrJH2XtliCrjjVmw7aco6oGe09a8jePuOlvb3hsFSucNsQ1Jbp0YTbrrdxt00k58qoKbf"
);

const bodyParser = require("body-parser");

function initExpressRoutes(app, client, logger) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // Enable CORS for all routes and origins
  app.use(cors());
  // parse application/json
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    /**
     * The following line attaches the MongoDB client to the request object.
     */
    req.client = client;
    req.logger = logger;
    next();
  });

  /**
   * Reference: https://expressjs.com/en/guide/routing.html
   */
  app.get("/ping", pingController);
  app.post("/bus", busCreateController);
  app.post("/process-payment", async (req, res) => {
    try {
      const { amount, paymentMethodId } = req.body;

      // Create a PaymentIntent with the specified amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount is expected to be in cents
        currency: "inr",
        payment_method: paymentMethodId,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        },
        confirm: true, // Automatically confirm the payment
      });

      res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({
        success: false,
        message: "Payment processing failed",
        error: error.message,
      });
    }
  });
  // Add more routes here
}

module.exports = initExpressRoutes;
