import './App.css';
import FederatedLogin from './federated-login';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentform';

const stripePromise = loadStripe('pk_test_51OMsZzSIVwEMKq3NQ6OEI3mNhs8it3cGJDZherO02oPoelzt93CruAooVD4iNiCuRqtFzULCdZr1N0YBQvKOecG900U1OWQMwy');

function App() {
  return (
    <div style={{
      margin: '1em',
      padding: '10px'
    }}>
      <h1>Skeleton App</h1>
      <div>
      {/* <FederatedLogin /> */}
      <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
      </div>
    </div>
  );
}

export default App;
