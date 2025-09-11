  import Layout from './../layout/Layout.jsx';
  import CartItem from './../components/CartItem.jsx';
  import { BASE_URL } from './../../redux/constants/BASE_URL.js';

  import axios from "axios";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { saveShippingAddressAction } from './../../redux/actions/Cart.js';

  import { ORDER_RESET } from './../../redux/constants/Order.js';
  import { orderAction, orderPaymentAction } from '../../redux/actions/Order.js';
  import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
  import { useNavigate } from 'react-router-dom';

  export default function PlaceOrder(){
      const cart = useSelector((state) => state.cartReducer);
      const { cartItems, shippingAddress } = cart;
      
      // subtotal (does not include the tax, shipping fee)
      const addDecimal = (num) => { return( Math.round(num * 100) / 100 ).toFixed(2) }
      // subtotal price
      const subTotal = addDecimal(
        cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
      );
      const taxPrice = addDecimal(Number(0.15 * subTotal).toFixed(2));
      const shippingPrice = addDecimal(subTotal > 100 ? 0 : 20);
      // total
      const total = (
        Number(subTotal) +
        Number(taxPrice) +
        Number(shippingPrice)
      ).toFixed(2);

      // const [] = useState(shippingAddress.);
      const [address, setAddress] = useState(shippingAddress.address);
      const [city, setCity] = useState(shippingAddress.city);
      const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
      const [country, setCountry] = useState(shippingAddress.country);

      const [clientId, setClientId] = useState(null);

      const getPaypalClientID = async() => {
        const response = await axios.get(`${BASE_URL}/api/config/paypal`);
        const fetchedClientId = response.data;

        setClientId(fetchedClientId);
      }


      // added for order confirm
      const orderReducer = useSelector((state) => state.orderReducer);
      const {order, success} = orderReducer;
      const [paymentResult, setPaymentResult] = useState({});
      
      const navigate = useNavigate();

      const dispatch = useDispatch();

      const saveShippingAddresss = () => {
        dispatch(saveShippingAddressAction({
          address, city, postalCode, country
        }))
      }

      const successPaymentHandler = async(paymentResult) => {
        try {
          setPaymentResult(paymentResult);
          dispatch(orderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            totalPrice: total,
            paymentMethod: "paypal",
            price: subTotal,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice
          }));
        }catch(err){ console.log(err) }
      }

      useEffect(() => {
        getPaypalClientID();

        // add for order confirm, payment success
        if (success){
          dispatch({ type: ORDER_RESET });
          dispatch(orderPaymentAction(order._id, paymentResult));
          navigate(`/order/${order._id}`, {});
        }
      });

      useEffect(() => {
        console.log("Current clientId state:", clientId);
      }, [clientId]);

      return(<Layout>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 md:w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mt-0 w-full">
                <h2 className="text-sm title-font text-gray-900 tracking-widest">Order Summary</h2>
                {/* <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"></h1> */}
                <CartItem cartItems={cartItems} />
                <div className='mt-6'>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="ml-auto text-gray-900">${subTotal}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-700">Tax</span>
                    <span className="ml-auto text-gray-900">${taxPrice}</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-700">Shipping Price</span>
                    <span className="ml-auto text-gray-900">${shippingPrice}</span>
                  </div>
                </div>

                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                </div>
                
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">${total}</span>
                </div>
            
              </div>
              <div className="lg:w-1/2 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-1 md:mt-0 relative ">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Shipping Address</h2>
                {/* <p className="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p> */}
                <div className="relative mb-1">
                  <label htmlFor="address" className="leading-1 text-sm text-gray-800">Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-1">
                  <label htmlFor="city" className="leading-1 text-sm text-gray-800">City</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-1">
                  <label htmlFor="postalcode" className="leading-1 text-sm text-gray-800">Postal Code</label>
                  <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" id="postalcode" name="postalcode" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div className="relative mb-3">
                  <label htmlFor="country" className="leading-1 text-sm text-gray-800">Country</label>
                  <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" name="country" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                
                <button
                  onClick={saveShippingAddresss}
                  className=" mb-10 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Save Shipping Address
                </button>
                
                {
                  clientId &&
                  (<PayPalScriptProvider options={{ clientId: clientId }}>
                      <PayPalButtons
                        className='z-0'
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{ amount: {
                              currency_code: "USD",
                              value: total
                            }}]
                          })
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(function(details){
                            successPaymentHandler(details);
                          });
                        }}
                      />
                  </PayPalScriptProvider>)
                }
              </div>
              
            
            </div>
          </div>
        </section>    
      </Layout>)
  }
