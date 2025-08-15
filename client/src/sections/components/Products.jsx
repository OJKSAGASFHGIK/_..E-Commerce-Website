import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from './../../redux/actions/product.js';


const Products = () => {
    const dispatch = useDispatch();
    const productListReducer = useSelector((state) => state.productListReducer);
    const { loading, error, products = [], } = productListReducer;

    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);
    
    return(
        <>
            {loading ? <h1>Loading</h1> :
            error ? <h1>{error}</h1> :
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {products.map((product) => (
                    <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-gray-300 hover:scale-105 transition-transform duration-333" key={product._id}>
                        <Link to={`/products/${product._id}`} className="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.image} />
                        </Link>
                        <div className="mt-4">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                            <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                            <div className="flex justify-between">
                                <p className="mt-1">{product.price}</p>
                                <p className="mt-1">★: {product.numReview}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </div>
            </section>
            }
        </>
)}

export default Products