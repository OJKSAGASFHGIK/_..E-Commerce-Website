import Layout from '../layout/Layout.jsx';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productAction } from './../../redux/actions/Product.js';
import { addToCartAction } from './../../redux/actions/Cart.js';


function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const { loading, error, product } = productReducer;

  useEffect(() => {
    dispatch(productAction(id))
  }, [dispatch, id])

  const [quantity, setQuantity] = useState(1);
  const addToCartHandler = () => {
    dispatch(addToCartAction(id, quantity));
  }

  return (
    <Layout>
      {loading ? (<h1>Loading</h1>) :
      error ? (<h1>{error}</h1>) : (
      <>
        <section className="py-8 md:py-16 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img className="w-full hidden dark:block" src={product.image} alt="" />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1
                  className="text-xl font-semibold text-gray-900 sm:text-2xl"
                >
                  {product.name}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p
                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
                  >
                    ${product.price}
                  </p>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                    >
                      ({product.rating})
                    </p>
                    <a
                      href="#"
                      className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                    >
                      {product.numReview}
                    </a>
                  </div>
                </div>
                
                <div className='flex justify-between'>
                {product.countInStock > 0 ?
                  <div className=''>Quantity: 
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    className="mt-2 ml-1 rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                  >
                    {[...Array(product.countInStock).keys().map(
                      (x) => (
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      )
                    )]}
                  </select>
                  </div>
                  : <></>}
                  {product.countInStock > 0 ? 
                  <button onClick={addToCartHandler} className="mt-3 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300">
                    Add to Cart
                  </button>
                  :
                  <h1 className="cursor-not-allowed mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300">
                    Unavailable
                  </h1>}
                  
                </div>


                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                <p className="mb-6 text-gray-900">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
      )
      }
    </Layout>
  )
}

export default ProductDetails
