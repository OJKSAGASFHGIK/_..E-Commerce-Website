import { useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from './../../redux/actions/Cart.js';

export default function CartItem({ cartItems }){
    const dispatch = useDispatch();
    const removeFromCartHandler = (id) => {
      dispatch(removeFromCartAction(id));
    };
    const addToCartHandler = (id, quantity) => {
      dispatch(addToCartAction(id, quantity));
    };  

    return (<>
        <div className="mt-8">
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((product, index) => (
                        <li key={product.id || index} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product.name} src={product.image} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-900">
                                        Quantity:

                                        <select
                                            value={product.quantity}
                                            onChange={(e) => addToCartHandler(
                                                product.product,
                                                Number(e.target.value)
                                            )}
                                            className="cursor-pointer rounded ml-2 border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}

                                        </select>
                                    </p>

                                    <div className="flex">
                                        <button onClick={() => removeFromCartHandler(product.product)} type="button" className="cursor-pointer font-medium text-red-600 hover:text-red-500">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}
