import Layout from './../layout/Layout.jsx';

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { orderListAction } from '../../redux/actions/Order.js';


export default function OrderHistory(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderListAction())
    }, [dispatch]);

    const orderListReducer = useSelector((state) => state.orderListReducer);
    const { orders, loading, error } = orderListReducer;

    return(<Layout>
        {
            loading
            ? (<h1>Loading</h1>)
            /* : error
            ? (<h1>{error}</h1>) */
            :
            <>
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            My orders
                            </h2>
                        </div>

                        {orders && orders.map((order) => (
                            <div key={order.id} className="mt-6 flow-root sm:mt-8">
                                <div className="divide-y divide-gray-200">
                                <div className="flex flex-wrap items-center gap-y-4 py-6">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500">Order ID:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        <a href="#" className="hover:underline">#{order._id}</a>
                                    </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500">Date:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        20.12.2023
                                    </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500">Price:</dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900">
                                        ${order.totalPrice}
                                    </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500">Status:</dt>
                                    <dd 
                                        className={`
                                            ${order.isPaid ? `bg-green-500`:`bg-red-500`}
                                            me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800`
                                        }
                                    >
                                        <svg
                                        className="me-1 h-3 w-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                                        </svg>
                                        {order.isPaid ? "Paid" : "Not Paid Yet"}
                                    </dd>
                                    </dl>

                                    {/* <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                    <button
                                        type="button"
                                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto"
                                    >
                                        Cancel order
                                    </button>
                                    <a
                                        href="#"
                                        className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto"
                                    >
                                        View details
                                    </a>
                                    </div> */}
                                </div>
                                </div>
                            </div>
                        ))}

                        </div>
                    </div>
                </section>
            </>
        }
    </Layout>);
}